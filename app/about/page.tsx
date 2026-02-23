import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* HERO */}
      <section className="pt-0 -mt-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
              ABOUT
            </p>

            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-[1.04]">
              한 그릇으로
              <br />
              기준을 세웁니다.
            </h1>

            <p className="mt-8 text-base md:text-lg leading-relaxed text-neutral-600">
              조선한그릇은 “메뉴를 늘려서 성장”하지 않습니다.
              <br className="hidden md:block" />
              단 하나의 쌀국수를 <span className="text-amber-600 font-black">3,000원</span>에,
              매일 같은 품질로 제공합니다.
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
        </div>
      </section>

      {/* WHY NAME */}
      <section className="mt-14 md:mt-16">
        <div className="container">
          <div className="rounded-[28px] border border-neutral-200 bg-white p-7 md:p-9 shadow-[0_20px_60px_rgba(0,0,0,.04)]">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
              WHY “JOSUN HANGRUEOT”
            </p>

            <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_.8fr] items-start">
              <div>
                <p className="text-2xl md:text-3xl font-black tracking-tight leading-[1.08]">
                  조선한그릇은 “한 그릇”의 태도입니다.
                </p>
                <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">
                  ‘조선’은 기준과 기술을 상징합니다. ‘한그릇’은 집중을 상징합니다.
                  <br className="hidden md:block" />
                  전통을 과장하지 않고, 구조를 정교하게 만들고, 가격을 단순하게 유지합니다.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 flex items-center justify-between">
                  <span className="text-xs tracking-[0.28em] font-bold text-neutral-500">FOCUS</span>
                  <span className="text-sm md:text-base font-black tracking-tight">ONE BOWL</span>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 flex items-center justify-between">
                  <span className="text-xs tracking-[0.28em] font-bold text-neutral-500">STANDARD</span>
                  <span className="text-sm md:text-base font-black tracking-tight">SAME QUALITY</span>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 flex items-center justify-between">
                  <span className="text-xs tracking-[0.28em] font-bold text-neutral-500">PRICE</span>
                  <span className="text-sm md:text-base font-black tracking-tight text-amber-700">
                    3,000원
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="mt-20 md:mt-24">
        <div className="container">
          <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
            PRINCIPLES
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">
            운영을 지키는 3가지 원칙
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "단순함",
                desc: "선택지를 줄이면 기준이 선명해집니다. 메뉴가 아닌, 기준이 운영을 만듭니다.",
              },
              {
                num: "02",
                title: "일관성",
                desc: "동선과 공정을 단순화해 편차를 줄입니다. 반복은 타협이 아니라 완성도입니다.",
              },
              {
                num: "03",
                title: "집중",
                desc: "지금은 배달/포장을 하지 않습니다. 매장에서의 경험과 품질에 집중합니다.",
              },
            ].map((x) => (
              <div
                key={x.num}
                className="rounded-[26px] border border-neutral-200 bg-white p-7 md:p-8 shadow-[0_18px_50px_rgba(0,0,0,.04)]"
              >
                <p className="text-xs tracking-[0.3em] font-bold text-black/35">{x.num}</p>
                <h3 className="mt-5 text-xl font-black tracking-tight">{x.title}</h3>
                <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DINE-IN */}
      <section className="mt-20 md:mt-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div>
              <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                DINE-IN ONLY
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">
                왜 방문 식사 전용인가
              </h2>

              <p className="mt-6 text-sm md:text-base text-neutral-600 leading-relaxed">
                조선한그릇의 목표는 “편리함”이 아니라 “정확함”입니다.
                한 그릇이 매장에서 가장 좋은 상태로 제공되도록 설계되어 있습니다.
              </p>

              <p className="mt-6 text-sm md:text-base text-neutral-600 leading-relaxed">
                배달/포장은 확장에 유리합니다. 하지만 지금 우리는 확장을 말하지 않습니다.
                기준을 먼저 완성하고, 매일 같은 품질을 만드는 것부터 끝냅니다.
              </p>
            </div>

            <div className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-7 md:p-8">
              <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                OPERATING RULES
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  ["메뉴", "쌀국수 1"],
                  ["가격", "3,000원"],
                  ["운영", "방문 식사 전용"],
                  ["목표", "품질 편차 최소화"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 flex items-center justify-between"
                  >
                    <span className="text-xs tracking-[0.28em] font-bold text-neutral-500">{k}</span>
                    <span
                      className={`text-sm md:text-base font-black tracking-tight ${
                        k === "가격" ? "text-amber-700" : "text-black"
                      }`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-white/70 p-5">
                <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
                  NOTE
                </p>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  이 구조가 유지되는 한, 브랜드는 흔들리지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT + CTA */}
      <section className="mt-20 md:mt-24 pb-24 md:pb-32">
        <div className="container">
          <div className="rounded-[28px] border border-neutral-200 bg-white p-7 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,.06)]">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
              BRAND STATEMENT
            </p>

            <p className="mt-7 text-2xl md:text-4xl font-black tracking-tight leading-[1.08]">
              단 하나의 메뉴.
              <br />
              변하지 않는 가격.
              <br />
              흔들리지 않는 기준.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/visit" className="btn btn-black">
                매장 안내
              </Link>
              <Link href="/menu" className="btn btn-outline">
                메뉴 보기
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