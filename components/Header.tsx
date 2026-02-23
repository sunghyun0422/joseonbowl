"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = (() => {
    if (isHome && !scrolled) return "bg-transparent";
    return "bg-white/95 backdrop-blur border-b border-neutral-200";
  })();

  const navClass = (() => {
    if (isHome && !scrolled) return "text-white/90";
    return "text-black/80";
  })();

  const navHover = (() => {
    if (isHome && !scrolled) return "hover:text-white";
    return "hover:text-black";
  })();

  // ✅ 로고 텍스트 색상
  const logoColor = isHome && !scrolled ? "text-white" : "text-black";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerBg}`}
    >
      <div className="mx-auto max-w-[1760px] px-4 md:px-10 h-20 relative flex items-center">
        {/* ✅ LEFT: Logo (클릭 영역 깔끔 + 살짝 오른쪽 + 고급 타이포) */}
        <Link
          href="/"
          className={[
            "inline-flex items-center", // ✅ 클릭 영역을 글자 주변으로
            "ml-8 md:ml-24",            // ✅ '오른쪽으로 이동'은 padding말고 margin
            "select-none",
            "transition-colors",
            logoColor,
          ].join(" ")}
          aria-label="조선한그릇 홈"
        >
          <span
            className={[
              "text-[18px] md:text-[19px]", // ✅ 살짝 정제된 크기
              "font-semibold",              // ✅ font-black 보다 고급스럽게
              "tracking-[0.02em]",          // ✅ 살짝 숨 쉬는 자간
              "leading-none",
            ].join(" ")}
          >
            조선한그릇
          </span>
        </Link>

        {/* CENTER: Nav (화면 정중앙 고정) */}
        <nav
          className={`hidden md:flex items-center gap-8 text-sm font-medium ${navClass} absolute left-1/2 -translate-x-1/2`}
        >
          <Link href="/about" className={`transition-colors ${navHover}`}>
            소개
          </Link>
          <Link href="/menu" className={`transition-colors ${navHover}`}>
            메뉴
          </Link>
          <Link href="/visit" className={`transition-colors ${navHover}`}>
            매장
          </Link>
          <Link href="/contact" className={`transition-colors ${navHover}`}>
            문의
          </Link>
        </nav>
      </div>
    </header>
  );
}