"use client";

import { useEffect, useState } from "react";

export default function RecipeFilm() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section className="mt-20 md:mt-24">
        <div className="container">
          <div className="rounded-[28px] border border-neutral-200 bg-white p-7 md:p-9 shadow-[0_20px_60px_rgba(0,0,0,.04)]">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-neutral-500">
              RECIPE FILM
            </p>

            <div className="mt-6 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.08]">
                조선한그릇은 이렇게 만듭니다.
              </h2>

              <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">
                빠르게 만들지만, 대충 만들지 않습니다.
                <br className="hidden md:block" />
                단순한 공정으로 편차를 줄이고, 한 그릇의 기준을 지키는 과정을 담았습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group mt-8 mx-auto block w-full max-w-[300px] overflow-hidden rounded-[24px] border border-neutral-200 bg-black shadow-[0_20px_60px_rgba(0,0,0,.08)]"
              aria-label="레시피 영상 크게 보기"
            >
              <div className="relative aspect-[9/16]">
                <img
                  src="/images/recipe-thumb.jpg"
                  alt="조선한그릇 레시피 영상 썸네일"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/28" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/92 shadow-lg">
                    <div className="ml-1 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-black" />
                  </div>
                </div>
              </div>
            </button>

            <p className="mt-4 text-center text-xs md:text-sm text-neutral-500">
              클릭하면 크게 볼 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 px-4 py-6 backdrop-blur-[2px] md:px-6"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="relative w-full max-w-[420px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 rounded-full bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur hover:bg-white/20"
              >
                닫기
              </button>

              <div className="overflow-hidden rounded-[24px] bg-black shadow-[0_30px_100px_rgba(0,0,0,.45)]">
                <video
                  className="block max-h-[85vh] w-full h-auto"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src="/videos/recipe.mp4" type="video/mp4" />
                  브라우저가 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}