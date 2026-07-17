"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

export function usePortfolioMotion(
  scope: RefObject<HTMLElement | null>,
  language: "en" | "ar",
) {
  useEffect(() => {
    const root = scope.current;

    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let dispose = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled) return;

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        const magneticCleanups: Array<() => void> = [];

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from(".hero .eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
            .from(".hero-line", { autoAlpha: 0, yPercent: 110, rotate: 2, duration: 0.85, stagger: 0.1 }, "-=0.2")
            .from(".hero-sub, .oval-link", { autoAlpha: 0, y: 22, duration: 0.55, stagger: 0.08 }, "-=0.42");

          gsap.to(".hero-highlight", {
            fontWeight: 800,
            backgroundPosition: "0% 0%",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(".scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: 54,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            });
          });

          gsap.from(".step", {
            autoAlpha: 0,
            y: 70,
            rotate: 1.5,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: ".steps", start: "top 78%" },
          });

          gsap.from(".brand-wall span", {
            autoAlpha: 0,
            scale: 0.86,
            rotate: () => gsap.utils.random(-4, 4),
            stagger: { amount: 0.65, from: "random" },
            duration: 0.65,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: ".brand-wall", start: "top 80%" },
          });

          root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
            const move = (event: PointerEvent) => {
              const bounds = element.getBoundingClientRect();
              gsap.to(element, {
                x: (event.clientX - bounds.left - bounds.width / 2) * 0.14,
                y: (event.clientY - bounds.top - bounds.height / 2) * 0.18,
                duration: 0.35,
                ease: "power2.out",
              });
            };
            const reset = () => gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.35)" });

            element.addEventListener("pointermove", move);
            element.addEventListener("pointerleave", reset);
            magneticCleanups.push(() => {
              element.removeEventListener("pointermove", move);
              element.removeEventListener("pointerleave", reset);
            });
          });
        }, root);

        ScrollTrigger.refresh();
        dispose = () => {
          magneticCleanups.forEach((cleanup) => cleanup());
          context.revert();
        };
      },
    );

    return () => {
      cancelled = true;
      dispose();
    };
  }, [language, scope]);
}
