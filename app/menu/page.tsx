import Link from "next/link";
import Image from "next/image";

export default function MenuPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* HERO (About과 동일한 시작 방식: -mt-20) */}
      <section className="pt-0 -mt-20">
        <div className="container">
          <div className="max-w-6xl">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
              MENU
            </p>

            <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_.9fr] items-end">
              {/* LEFT */}
              <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.04]">
                  쌀국수 하나.
                  <br />
                  <span className="text-amber-600">3,000원</span>
                </h1>

                <p className="mt-8 text-base md:text-lg leading-relaxed text-neutral-600 max-w-xl">
                  조선한그릇은 단일 메뉴로 운영합니다.
                  <br className="hidden md:block" />
                  방문 식사 전용이며, 배달/포장은 운영하지 않습니다.
                </p>

                <div className="mt-10 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border border-neutral-200 bg-white text-black/70">
                    MENU 1
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border border-amber-200 bg-amber-50 text-amber-700">
                    3,000
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border border-neutral-200 bg-white text-black/70">
                    DINE-IN ONLY
                  </span>
                </div>
              </div>

              {/* RIGHT (✅ 기능 동일 + 확실히 오른쪽 정렬) */}
              <div className="md:flex md:justify-end">
                <div className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-7 md:p-8 w-full md:max-w-[440px]">
                  <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                    OPERATING NOTE
                  </p>

                  <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">
                    가격/구성은 운영 기준에 따라 일부 변동될 수 있습니다.
                    <br />
                    알레르기/식이 제한이 있다면 방문 전 문의해 주세요.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/visit" className="btn btn-black">
                      매장 안내
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      문의
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* /grid */}
          </div>
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="mt-14 md:mt-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {/* 이미지 카드 */}
            <div className="rounded-[28px] border border-neutral-200 bg-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.04)]">
              <div className="relative aspect-[4/3] bg-black">
                <Image
                  src="/images/menu.jpg"
                  alt="조선한그릇 쌀국수"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(800px 280px at 50% 20%, rgba(0,0,0,.05), rgba(0,0,0,.45)), linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.50) 100%)",
                  }}
                />
                <div className="absolute left-6 bottom-5 text-xs tracking-[0.32em] text-white/85 font-bold">
                  JOSUN HANGRUEOT
                </div>
              </div>

              <div className="p-6 md:p-7">
                <p className="text-xs text-neutral-500">
                  * 이미지는 예시입니다. 실제 제공 형태는 매장 운영 기준에 따라
                  달라질 수 있습니다.
                </p>
              </div>
            </div>

            {/* 설명 카드 */}
            <div className="rounded-[28px] border border-neutral-200 bg-white p-7 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,.04)]">
              <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                SIGNATURE
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight">
                조선한그릇 쌀국수
              </h2>

              <div className="mt-5 flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border border-amber-200 bg-amber-50 text-amber-700">
                  3,000원
                </span>
                <span className="text-xs text-neutral-500">
                  * 가격/구성은 운영에 따라 변동될 수 있습니다.
                </span>
              </div>

              <p className="mt-6 text-sm md:text-base text-neutral-600 leading-relaxed">
                우리는 ‘많이’가 아니라 ‘정확하게’를 선택합니다. 한 그릇의
                균형을 기준으로 매일 같은 품질을 목표로 합니다.
              </p>

              {/* 구성 */}
              <div className="mt-7 rounded-[22px] border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                  COMPONENTS
                </p>

                <div className="mt-4 grid gap-3">
                  {[
                    ["면", "쌀국수"],
                    ["육수", "자체 육수"],
                    ["토핑", "콩나물, 파"],
                    ["옵션", "현장 안내"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 flex items-center justify-between"
                    >
                      <span className="text-xs tracking-[0.28em] font-bold text-neutral-500">
                        {k}
                      </span>
                      <span className="text-sm md:text-base font-black tracking-tight">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 고지 */}
              <div className="mt-4 rounded-[22px] border border-neutral-200 bg-white/70 p-6">
                <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                  NOTICE
                </p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  알레르기/식이 제한이 있다면 방문 전 문의해 주세요. 가능한
                  범위 내에서 현장에서 안내드립니다.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/visit" className="btn btn-black">
                  매장 안내
                </Link>
                <Link href="/contact" className="btn btn-accent">
                  문의
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP (About 스타일 유지) */}
      <section className="mt-20 md:mt-24 pb-24 md:pb-32">
        <div className="container">
          <div className="rounded-[28px] border border-neutral-200 bg-white p-7 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,.06)]">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
              ONE MENU
            </p>

            <p className="mt-7 text-2xl md:text-4xl font-black tracking-tight leading-[1.08]">
              단 하나의 메뉴.
              <br />
              오늘도 같은 품질.
              <br />
              내일도 같은 기준.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/visit" className="btn btn-black">
                매장 안내
              </Link>
              <Link href="/about" className="btn btn-outline">
                브랜드 소개
              </Link>
              <Link href="/contact" className="btn btn-accent">
                문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}