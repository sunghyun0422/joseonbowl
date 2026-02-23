import Link from "next/link";

export default function Footer() {
  const instagramLink = "https://instagram.com/joseon_bowl"; // 없으면 ""로
  const hasInsta = Boolean(instagramLink);

  return (
    <footer className="mt-20">
      <div className="divider" />

      <div className="container py-8 md:py-10">
        {/* TOP ROW */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <p className="font-black tracking-tight">조선한그릇</p>
            <span className="badge badge-accent">3,000원</span>
            <span className="badge">DINE-IN ONLY</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link href="/about" className="muted hover:text-black">
              소개
            </Link>
            <Link href="/menu" className="muted hover:text-black">
              메뉴
            </Link>
            <Link href="/visit" className="muted hover:text-black">
              매장
            </Link>
            <Link href="/contact" className="muted hover:text-black">
              문의
            </Link>

            <span className="hidden md:inline-block h-4 w-px bg-neutral-200" />

            {hasInsta ? (
              <a
                href={instagramLink}
                target="_blank"
                rel="noreferrer"
                className="muted hover:text-black"
              >
                Instagram
              </a>
            ) : null}
          </nav>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-6 flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs muted">
          <p>© {new Date().getFullYear()} 조선한그릇</p>
          <p>* 방문 식사 전용(배달/포장 미운영)</p>
        </div>
      </div>
    </footer>
  );
}