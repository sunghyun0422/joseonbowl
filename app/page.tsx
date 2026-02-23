import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="hero -mt-20">
        <div className="hero-media">
          <Image
            src="/images/hero.jpg"
            alt="조선한그릇 대표 이미지"
            fill
            priority
            className="object-cover"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <div className="hero-inner">
              <p className="kicker-on-hero">JOSUN HANGRUEOT</p>

              <h1 className="hero-title">
                쌀국수 하나.
                <br />
                <span className="price-hero">3,000원</span>
              </h1>

              <p className="hero-sub">
                매장 식사 전용.<span className="dot">·</span>배달/포장 없음.
              </p>

              <div className="hero-cta">
                <Link href="/menu" className="btn btn-accent">
                  메뉴
                </Link>
                <Link href="/visit" className="btn btn-outline-on-hero">
                  매장
                </Link>
                <Link href="/contact" className="btn btn-ghost-on-hero">
                  문의
                </Link>
              </div>

              <div className="hero-meta">
                <div className="hero-chip">MENU 1</div>
                <div className="hero-chip hero-chip-accent">3,000</div>
                <div className="hero-chip">DINE-IN ONLY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AFTER HERO STRIP */}
      <section className="section">
        <div className="container">
          <div className="strip">
            <div>
              <p className="kicker">ONE THING</p>
              <p className="strip-title">한 그릇에만 집중합니다.</p>
            </div>

            <div className="strip-right">
              <span className="badge">쌀국수 1</span>
              <span className="badge badge-accent">3,000원</span>
              <span className="badge">매장 식사</span>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORE (✅ 본점/주소 placeholder 제거 + 기능/링크 동일) */}
      <section className="section pt-0">
        <div className="container">
          <div className="store-head">
            <div>
              <p className="kicker">OUR STORE</p>
              <h2 className="store-h2">
                가까운 자리에서,
                <br className="hidden md:block" />
                바로 한 그릇.
              </h2>
            </div>

            <Link href="/visit" className="store-link">
              매장 정보 →
            </Link>
          </div>

          <div className="store-grid-neo">
            {/* LEFT CARD */}
            <div className="store-card-neo">
              <div className="store-media">
                <Image
                  src="/images/hero.jpg"
                  alt="조선한그릇 취급 매장"
                  fill
                  className="object-cover"
                />
                <div className="store-media-overlay" />
                <div className="store-media-tag">JOSUN HANGRUEOT</div>
              </div>

              <div className="store-body">
                <div className="store-top">
                  <div>
                    <h3 className="store-title-neo">조선한그릇</h3>
                    <p className="store-sub">
                      조선한그릇은 <b>제휴 매장</b>에서 메뉴로 제공됩니다.
                      <br className="hidden md:block" />
                      <b className="text-black">매장</b> 페이지에서 가까운 취급 매장을 찾아보세요.
                    </p>
                  </div>

                  <div className="store-badge-neo">
                    <span>쌀국수</span>
                    <span className="store-badge-dot">•</span>
                    <span className="store-price-neo">3,000원</span>
                  </div>
                </div>

                <div className="store-rows-neo">
                  <div className="store-row-neo">
                    <span className="store-label">안내</span>
                    <span className="store-value">가까운 취급 매장 찾기</span>
                  </div>
                  <div className="store-row-neo">
                    <span className="store-label">확인</span>
                    <span className="store-value">주소/지도/영업/휴무</span>
                  </div>
                  <div className="store-row-neo">
                    <span className="store-label">운영</span>
                    <span className="store-value">매장 식사 전용</span>
                  </div>
                  <div className="store-row-neo">
                    <span className="store-label">가격</span>
                    <span className="store-value store-price-neo">3,000원</span>
                  </div>
                </div>

                {/* ✅ 링크/버튼은 원래 그대로 유지 */}
                <div className="store-cta-neo">
                  <Link href="/visit" className="btn btn-black">
                    방문 안내
                  </Link>
                  <Link href="/menu" className="btn btn-outline">
                    메뉴 보기
                  </Link>
                  <Link href="/contact" className="btn btn-outline">
                    문의
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT CARD (✅ 기능 동일 / NOTE 문구만 자연스럽게) */}
            <div className="store-card-neo store-card-soft-neo">
              <div className="store-body store-body--rules">
                <div className="rules-rail">
                  <div className="rules-head">
                    <p className="kicker">RULES</p>
                    <p className="rules-title">
                      메뉴는 하나.
                      <br />
                      가격은 <span className="rules-accent">3,000원</span>.
                    </p>
                    <p className="rules-sub">매장 식사 전용.</p>
                  </div>

                  <div className="rules-grid">
                    <div className="rule">
                      <p className="rule-k">MENU</p>
                      <p className="rule-v">1</p>
                    </div>
                    <div className="rule">
                      <p className="rule-k">PRICE</p>
                      <p className="rule-v rules-accent">3,000</p>
                    </div>
                    <div className="rule">
                      <p className="rule-k">SERVICE</p>
                      <p className="rule-v">DINE-IN</p>
                    </div>
                  </div>

                  <div className="rules-note">
                    <p className="kicker">NOTE</p>
                    <p className="muted mt-2">
                      취급 매장 페이지에서 내 위치 기준으로 가까운 매장을 찾을 수 있어요.
                    </p>
                  </div>

                  {/* ✅ 링크/버튼은 원래 그대로 유지 */}
                  <div className="rules-actions">
                    <Link href="/visit" className="btn btn-accent">
                      길찾기
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                      문의
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* /store-grid-neo */}
          </div>
        </div>
      </section>
    </div>
  );
}