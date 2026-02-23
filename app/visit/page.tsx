"use client";

import { useMemo, useRef, useState } from "react";
import { stores } from "../data/stores";
import type { Store } from "../data/stores";

function toRad(v: number) {
  return (v * Math.PI) / 180;
}
function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
function fmtDistance(km?: number) {
  if (km == null) return "—";
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)}km`;
}

type LatLng = { lat: number; lng: number };

// ✅ 위치 캐시(동일 페이지에서 재사용 → 체감 속도 개선)
const LOC_CACHE_MS = 60_000;
let locCache: { t: number; pos: LatLng } | null = null;

export default function VisitPage() {
  const [selectedId, setSelectedId] = useState(stores[0]?.id ?? "");
  const [myPos, setMyPos] = useState<LatLng | null>(null);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [locLoading, setLocLoading] = useState(false);

  // ✅ 검색 input focus 유지용(화면 점프 체감 줄이기)
  const searchRef = useRef<HTMLInputElement | null>(null);

  const selected = useMemo(
    () => stores.find((s) => s.id === selectedId) ?? stores[0],
    [selectedId]
  );

  // ✅ 내 위치 기준 거리/정렬은 myPos가 있을 때만 계산
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();

    return stores
      .map((s) => {
        const km =
          myPos && s.lat != null && s.lng != null
            ? distanceKm(myPos.lat, myPos.lng, s.lat, s.lng)
            : undefined;

        return { ...s, km };
      })
      .filter((s) => {
        if (!q) return true;
        return (
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          (s.note ?? "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        // myPos 없으면 기존 순서(이름순)
        const ak = a.km ?? Number.POSITIVE_INFINITY;
        const bk = b.km ?? Number.POSITIVE_INFINITY;
        if (ak !== bk) return ak - bk;
        return a.name.localeCompare(b.name);
      });
  }, [myPos, query]);

  const noResults = query.trim().length > 0 && list.length === 0;

  function getGeoPosition(): Promise<LatLng> {
    // ✅ JS 캐시로 즉시 반환 (체감 속도)
    if (locCache && Date.now() - locCache.t < LOC_CACHE_MS) {
      return Promise.resolve(locCache.pos);
    }

    if (typeof window === "undefined" || !navigator.geolocation) {
      return Promise.reject(new Error("NO_GEO"));
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          locCache = { t: Date.now(), pos: next };
          resolve(next);
        },
        (err) => reject(err),
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: LOC_CACHE_MS, // ✅ 브라우저 캐시도 허용
        }
      );
    });
  }

  function pickNearest(pos: LatLng) {
    const nearest = stores
      .filter((s) => s.lat != null && s.lng != null)
      .map((s) => ({
        s,
        km: distanceKm(pos.lat, pos.lng, s.lat as number, s.lng as number),
      }))
      .sort((a, b) => a.km - b.km)[0]?.s;

    return nearest ?? null;
  }

  // ✅ HERO 버튼(가까운 매장 선택 + 지도 변경)
  async function onPickNearestFromHero() {
    setNotice("");
    setLocLoading(true);
    setNotice("내 위치를 확인 중입니다...");

    try {
      const pos = await getGeoPosition();
      setMyPos(pos);

      const nearest = pickNearest(pos);
      if (nearest) {
        setSelectedId(nearest.id);
        setNotice(`가까운 매장: ${nearest.name}`);
      } else {
        setNotice("등록된 매장에 좌표가 없어 가까운 매장을 계산할 수 없어요.");
      }
    } catch (err: any) {
      setMyPos(null);
      if (err?.code === 1) {
        setNotice("위치 접근이 거절되었습니다. 브라우저 설정에서 허용해 주세요.");
      } else {
        setNotice("위치를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setLocLoading(false);
    }
  }

  // ✅ LEFT 버튼(정렬 목적: 검색어 삭제 + 내 위치 획득 + 정렬)
  async function onSortByMyLocation() {
    setNotice("");
    setQuery(""); // ✅ 검색어 즉시 사라짐(스크롤 이동 없음)
    setLocLoading(true);

    // 입력 포커스가 살아있게(UX)
    requestAnimationFrame(() => {
      searchRef.current?.blur();
    });

    try {
      const pos = await getGeoPosition();
      setMyPos(pos);

      const nearest = pickNearest(pos);
      if (nearest) {
        // 원하면 지도도 바뀌게 유지
        setSelectedId(nearest.id);
        setNotice(`가까운 매장: ${nearest.name}`);
      } else {
        setNotice("등록된 매장에 좌표가 없어 가까운 매장을 계산할 수 없어요.");
      }
    } catch (err: any) {
      setMyPos(null);
      if (err?.code === 1) {
        setNotice("위치 접근이 거절되었습니다. 브라우저 설정에서 허용해 주세요.");
      } else if (err?.message === "NO_GEO") {
        setNotice("이 브라우저에서는 위치 기능을 사용할 수 없어요.");
      } else {
        setNotice("위치를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setLocLoading(false);
    }
  }

  // ✅ 검색 결과 없음 박스 안 버튼(느림 체감 해결: 즉시 메시지 + 캐시 사용)
  async function onPickNearestFromNoResults() {
    // 검색결과 없음 상태에서: 검색어 즉시 제거 → 바로 리스트가 돌아옴
    setQuery("");
    setNotice("");
    setLocLoading(true);
    setNotice("내 위치를 확인 중입니다...");

    try {
      const pos = await getGeoPosition();
      setMyPos(pos);

      const nearest = pickNearest(pos);
      if (nearest) {
        setSelectedId(nearest.id);
        setNotice(`가까운 매장: ${nearest.name}`);
      } else {
        setNotice("등록된 매장에 좌표가 없어 가까운 매장을 계산할 수 없어요.");
      }
    } catch (err: any) {
      setMyPos(null);
      if (err?.code === 1) {
        setNotice("위치 접근이 거절되었습니다. 브라우저 설정에서 허용해 주세요.");
      } else {
        setNotice("위치를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setLocLoading(false);
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="section pt-0">
        <div className="container">
          <div className="divider" />
          <div className="py-10 md:py-12">
            <p className="kicker">VISIT</p>
            <h1 className="mt-4 text-5xl md:text-6xl">취급 매장 찾기</h1>

            <p className="mt-6 muted max-w-2xl text-base md:text-lg">
              조선한그릇은 제휴 식당에서 메뉴로 제공됩니다.
              <br className="hidden md:block" />
              왼쪽 매장을 클릭하면 오른쪽 지도가 해당 위치로 바뀝니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="btn btn-black cursor-pointer disabled:opacity-60"
                onClick={onPickNearestFromHero}
                type="button"
                disabled={locLoading}
              >
                {locLoading ? "위치 확인 중..." : "내 위치 기준으로 가까운 매장 보기"}
              </button>
            </div>

            {notice ? (
              <div
                className="mt-6 rounded-2xl border p-5"
                style={{
                  borderColor: "rgb(var(--line))",
                  background: "rgb(var(--soft))",
                }}
              >
                <p className="font-bold">안내</p>
                <p className="mt-2 text-sm muted">{notice}</p>
              </div>
            ) : null}
          </div>
          <div className="divider" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {/* LEFT — LIST */}
            <div className="strip">
              <div className="w-full">
                <p className="kicker">PARTNERS</p>
                <h2 className="strip-title">취급 매장</h2>
                <p className="mt-3 muted text-sm md:text-base">
                  매장을 클릭하면 오른쪽 지도가 해당 위치로 바뀝니다.
                </p>

                {/* 검색 + 버튼 */}
                <div className="mt-6 flex flex-col gap-3">
                  <input
                    ref={searchRef}
                    className="input w-full"
                    placeholder="매장/지역/주소로 검색 (등록된 매장만 검색됩니다)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn btn-outline cursor-pointer disabled:opacity-60"
                      onClick={onSortByMyLocation}
                      disabled={locLoading}
                      title="검색어를 지우고, 내 위치 기준으로 가까운 순서로 정렬합니다"
                    >
                      {locLoading ? "정렬 중..." : "내 위치로 정렬"}
                    </button>

                    {query.trim() ? (
                      <button
                        type="button"
                        className="btn btn-outline cursor-pointer"
                        onClick={() => setQuery("")}
                        title="검색어를 지웁니다"
                      >
                        검색 지우기
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* 검색 결과 없음 */}
                {noResults ? (
                  <div
                    className="mt-6 rounded-2xl border p-5"
                    style={{
                      borderColor: "rgb(var(--line))",
                      background: "rgb(var(--soft))",
                    }}
                  >
                    <p className="font-bold">검색 결과가 없어요</p>
                    <p className="mt-2 text-sm muted">
                      “{query}”에 해당하는 제휴 매장이 아직 등록되지 않았습니다.
                      <br />
                      대신 <b className="text-black">내 위치 기준</b>으로 가까운 매장을 찾아볼까요?
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="btn btn-black cursor-pointer disabled:opacity-60"
                        onClick={onPickNearestFromNoResults}
                        disabled={locLoading}
                      >
                        {locLoading ? "위치 확인 중..." : "내 위치로 가까운 매장 보기"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline cursor-pointer"
                        onClick={() => setQuery("")}
                      >
                        검색어만 지우기
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* 리스트 */}
                <div className="mt-6 grid gap-4">
                  {list.map((s: Store & { km?: number }) => {
                    const active = selected?.id === s.id;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedId(s.id)}
                        className={[
                          "rounded-2xl border p-5 text-left transition cursor-pointer",
                          "hover:-translate-y-[1px]",
                          "hover:shadow-[0_18px_50px_rgba(0,0,0,.06)]",
                        ].join(" ")}
                        style={{
                          borderColor: active ? "rgb(var(--ink))" : "rgb(var(--line))",
                          background: active ? "rgb(var(--soft))" : "rgb(var(--bg))",
                        }}
                        aria-pressed={active}
                        title="클릭하면 오른쪽 지도가 이 위치로 이동합니다"
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="text-lg md:text-xl font-black tracking-tight">
                              {s.name}
                            </p>
                            <p className="mt-2 text-sm muted">{s.address}</p>
                            {s.note ? <p className="mt-2 text-sm muted">{s.note}</p> : null}
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span className="badge badge-accent">{fmtDistance(s.km)}</span>
                          </div>
                        </div>

                        <div className="mt-4 text-sm font-bold underline underline-offset-4 hover:opacity-70">
                          지도에서 보기 →
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT — MAP */}
            <div className="strip">
              <div className="w-full">
                <p className="kicker">MAP</p>
                <h2 className="strip-title">지도</h2>

                {selected ? (
                  <>
                    <div className="mt-3 flex items-start justify-between gap-6">
                      <div>
                        <p className="text-base md:text-lg font-black tracking-tight">
                          {selected.name}
                        </p>
                        <p className="mt-1 text-sm muted">{selected.address}</p>
                      </div>

                      <a
                        className="btn btn-outline cursor-pointer"
                        href={selected.gmapLink}
                        target="_blank"
                        rel="noreferrer"
                        title="지도 앱/브라우저에서 크게 보기"
                      >
                        큰 지도 보기
                      </a>
                    </div>

                    <div
                      className="mt-6 rounded-3xl border overflow-hidden"
                      style={{ borderColor: "rgb(var(--line))", height: "520px" }}
                    >
                      <iframe
                        title={`${selected.name} 지도`}
                        src={selected.gmapEmbed}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: 0 }}
                        allowFullScreen
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className="mt-6 rounded-2xl border p-5"
                    style={{
                      borderColor: "rgb(var(--line))",
                      background: "rgb(var(--soft))",
                    }}
                  >
                    <p className="font-bold">선택된 매장이 없어요</p>
                    <p className="mt-2 text-sm muted">왼쪽에서 매장을 선택해 주세요.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="divider mt-12" />
        </div>
      </section>
    </div>
  );
}