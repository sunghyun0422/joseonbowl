"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function ContactPage() {
  const contact = {
    phone: "010-5218-6945",
    instagram: "@joseon_bowl",
    instagramLink: "https://instagram.com/joseon_bowl",
  };

  const hasInsta = Boolean(contact.instagramLink);

  const [name, setName] = useState("");
  const [dt, setDt] = useState("");
  const [people, setPeople] = useState("");
  const [question, setQuestion] = useState("");

  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  const preview = useMemo(() => {
    return [
      "조선한그릇 문의",
      "",
      `이름: ${name.trim() || "-"}`,
      `방문 날짜/시간: ${dt.trim() || "-"}`,
      `인원: ${people.trim() || "-"}`,
      "",
      "문의 내용:",
      question.trim() || "-",
    ].join("\n");
  }, [name, dt, people, question]);

  async function onSubmit() {
    setStatusMsg("");

    const q = question.trim();
    if (!q || q.length < 2) {
      setStatusMsg("문의 내용을 입력해 주세요.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          dt: dt.trim(),
          people: people.trim(),
          question: q,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatusMsg(data?.message || "전송에 실패했습니다.");
        return;
      }

      setStatusMsg("전송 완료! 입력하신 내용이 메일로 전달되었습니다.");
      setName("");
      setDt("");
      setPeople("");
      setQuestion("");
    } catch {
      setStatusMsg("네트워크 오류로 전송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="section pt-0">
        <div className="container">
          <div className="divider" />

          <div className="py-10 md:py-12">
            <p className="kicker">CONTACT</p>
            <h1 className="mt-3 text-5xl md:text-6xl">문의</h1>

            <p className="mt-5 muted max-w-2xl text-base md:text-lg">
              배달/포장 문의는 받지 않습니다. <b className="text-black">방문 관련 문의</b>만
              안내드립니다.
              <br className="hidden md:block" />
              가장 빠른 답변은 <b className="text-black">전화</b> 또는{" "}
              <b className="text-black">인스타 DM</b>입니다.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="badge">DINE-IN ONLY</span>
              <span className="badge">배달/포장 미운영</span>
              <span className="badge badge-accent">방문 문의 우선</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/visit" className="btn btn-black">
                매장 안내
              </Link>
              <Link href="/menu" className="btn btn-outline">
                메뉴
              </Link>
            </div>
          </div>

          <div className="divider" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {/* LEFT — CHANNELS */}
            <div className="strip">
              <div className="w-full">
                <p className="kicker">CHANNELS</p>
                <h2 className="strip-title">연락 채널</h2>
                <p className="mt-3 muted text-sm md:text-base">
                  운영 중 통화가 어렵다면 인스타 DM으로 남겨주세요.
                </p>

                <div className="mt-7 grid gap-4">
                  {/* PHONE */}
                  <div
                    className="rounded-2xl border p-5"
                    style={{
                      borderColor: "rgb(var(--line))",
                      background: "rgb(var(--soft))",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="kicker">PHONE</p>
                        <p className="mt-2 text-lg md:text-xl font-black tracking-tight">
                          {contact.phone}
                        </p>
                        <p className="mt-2 text-sm muted">가장 빠른 문의 채널입니다.</p>
                      </div>
                      <span className="badge badge-accent">FAST</span>
                    </div>
                  </div>

                  {/* INSTAGRAM */}
                  <div
                    className="rounded-2xl border p-5"
                    style={{
                      borderColor: "rgb(var(--line))",
                      background: "rgb(var(--bg))",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="kicker">INSTAGRAM</p>
                        <p className="mt-2 text-lg md:text-xl font-black tracking-tight">
                          {contact.instagram}
                        </p>
                        <p className="mt-2 text-sm muted">
                          DM으로 남겨주시면 확인 후 답변드립니다.
                        </p>
                      </div>

                      <span className="badge">DM</span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {hasInsta ? (
                        <a
                          className="btn btn-black"
                          href={contact.instagramLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          인스타 열기
                        </a>
                      ) : (
                        <div
                          className="rounded-2xl border p-4 text-sm"
                          style={{
                            borderColor: "rgb(var(--line))",
                            background: "rgb(var(--soft))",
                            color: "rgb(var(--muted))",
                          }}
                        >
                          링크는 나중에 추가하면 됩니다 (instagramLink)
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="divider my-10" />

                <div
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "rgb(var(--line))",
                    background: "rgba(255,255,255,.75)",
                  }}
                >
                  <p className="kicker">TIP</p>
                  <p className="mt-3 text-sm md:text-base muted">
                    빠른 안내를 위해 문의 메시지에{" "}
                    <b className="text-black">방문 날짜/시간</b>,{" "}
                    <b className="text-black">인원</b>,{" "}
                    <b className="text-black">질문 내용</b>을 함께 적어주세요.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="badge">날짜/시간</span>
                    <span className="badge">인원</span>
                    <span className="badge">운영/휴무/대기</span>
                    <span className="badge">알레르기/식이</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — GUIDE + FORM */}
            <div className="strip">
              <div className="w-full">
                <p className="kicker">GUIDE</p>
                <h2 className="strip-title">문의 가이드</h2>
                <p className="mt-3 muted text-sm md:text-base">
                  아래를 포함해주시면 답변이 더 빨라집니다.
                </p>

                <div className="mt-7 grid gap-3">
                  {[
                    { k: "DATE / TIME", v: "방문 예정 날짜/시간" },
                    { k: "PEOPLE", v: "인원 수(단체 여부)" },
                    { k: "QUESTION", v: "운영시간/휴무/대기/재료 관련" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="rounded-2xl border bg-white px-5 py-4 flex items-center justify-between"
                      style={{ borderColor: "rgb(var(--line))" }}
                    >
                      <p
                        className="text-xs tracking-[0.28em] font-bold"
                        style={{ color: "rgb(var(--muted))" }}
                      >
                        {row.k}
                      </p>
                      <p className="text-sm md:text-base font-black tracking-tight">
                        {row.v}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ✅ 실제 메일 전송 폼 */}
                <div
                  className="mt-8 rounded-2xl border p-5"
                  style={{
                    borderColor: "rgb(var(--line))",
                    background: "rgb(var(--soft))",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="kicker">FORM</p>
                      <p className="mt-2 text-xl md:text-2xl font-black tracking-tight">
                        빠른 문의
                      </p>
                      <p className="mt-2 text-sm muted">
                        입력한 내용이 <b className="text-black">지정된 메일</b>로 전송됩니다.
                      </p>
                    </div>
                    <span className="badge">MAIL</span>
                  </div>

                  <form
                    className="mt-6 grid gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmit();
                    }}
                  >
                    <input
                      className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "rgb(var(--line))" }}
                      placeholder="이름"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={sending}
                    />
                    <input
                      className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "rgb(var(--line))" }}
                      placeholder="방문 날짜/시간 (예: 3/12 18:30)"
                      value={dt}
                      onChange={(e) => setDt(e.target.value)}
                      disabled={sending}
                    />
                    <input
                      className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "rgb(var(--line))" }}
                      placeholder="인원 (예: 2명)"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      disabled={sending}
                    />
                    <textarea
                      className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none"
                      style={{ borderColor: "rgb(var(--line))" }}
                      rows={5}
                      placeholder="문의 내용을 적어주세요. (운영/휴무/대기/재료/알레르기 등)"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={sending}
                    />

                    {/* 미리보기 (원하면 삭제 가능) */}
                    <div
                      className="rounded-2xl border bg-white p-4 text-sm whitespace-pre-wrap"
                      style={{ borderColor: "rgb(var(--line))" }}
                    >
                      {preview}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <button type="submit" className="btn btn-black" disabled={sending}>
                        {sending ? "전송 중..." : "보내기"}
                      </button>
                      <Link href="/visit" className="btn btn-outline">
                        매장 안내
                      </Link>
                      <Link href="/menu" className="btn btn-outline">
                        메뉴
                      </Link>
                    </div>

                    {statusMsg ? (
                      <div className="mt-2 text-sm font-bold">{statusMsg}</div>
                    ) : null}
                  </form>
                </div>

                <div className="divider my-10" />

                <div className="flex items-start justify-between gap-6">
                  <p className="text-sm font-bold">답변 시간 안내</p>
                  <p className="text-sm muted">운영 중에는 응답이 늦을 수 있어요</p>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { k: "OPEN", v: "오픈 직후" },
                    { k: "BREAK", v: "브레이크 전후" },
                    { k: "CLOSE", v: "마감 1시간 전" },
                  ].map((t) => (
                    <div
                      key={t.k}
                      className="rounded-2xl border p-5"
                      style={{
                        borderColor: "rgb(var(--line))",
                        background: "rgb(var(--soft))",
                      }}
                    >
                      <p className="text-xs muted font-bold">{t.k}</p>
                      <p className="mt-2 text-sm md:text-base font-bold">{t.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="divider mt-12" />
        </div>
      </section>
    </div>
  );
}