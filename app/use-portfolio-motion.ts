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
        const cursorCleanups: Array<() => void> = [];

        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from(".hero .eyebrow", { autoAlpha: 0, y: 16, duration: 0.55 })
            .from(".hero-line", { autoAlpha: 0, yPercent: 110, rotate: 2, duration: 0.85, stagger: 0.1 }, "-=0.2")
            .from(".hero-sub, .oval-link", { autoAlpha: 0, y: 22, duration: 0.55, stagger: 0.08 }, "-=0.42");

          gsap.fromTo(".hero-highlight", {
            backgroundSize: "0% 28%",
          }, {
            backgroundSize: "100% 28%",
            duration: 0.5,
            delay: 0.35,
            ease: "power3.out",
          });

          gsap.to(".scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
          });

          gsap.to(".section-orbit", {
            rotate: 55,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: ".journey", start: "top bottom", end: "bottom top", scrub: 1.1 },
          });

          gsap.to(".mosaic-scribble", {
            xPercent: 28,
            strokeDashoffset: -70,
            ease: "none",
            scrollTrigger: { trigger: ".brands", start: "top bottom", end: "bottom top", scrub: 1 },
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              clipPath: "inset(0 0 18% 0)",
              duration: 0.72,
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
            onComplete: () => gsap.set(".step", { clearProps: "transform,opacity,visibility" }),
            scrollTrigger: { trigger: ".steps", start: "top 78%" },
          });

          gsap.from(".brand-wall span", {
            autoAlpha: 0,
            scale: 0.86,
            rotate: () => gsap.utils.random(-4, 4),
            stagger: { amount: 0.65, from: "random" },
            duration: 0.65,
            ease: "back.out(1.5)",
            onComplete: () => gsap.set(".brand-wall span", { clearProps: "transform,opacity,visibility" }),
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

          const cursorOrb = root.querySelector<HTMLElement>(".cursor-orb");
          if (cursorOrb && window.matchMedia("(pointer: fine)").matches) {
            const moveX = gsap.quickTo(cursorOrb, "x", { duration: 0.42, ease: "power3.out" });
            const moveY = gsap.quickTo(cursorOrb, "y", { duration: 0.42, ease: "power3.out" });
            let lastX = window.innerWidth / 2;
            let lastY = window.innerHeight / 2;

            const moveCursor = (event: PointerEvent) => {
              const velocity = Math.min(Math.hypot(event.clientX - lastX, event.clientY - lastY) / 35, 0.8);
              const angle = Math.atan2(event.clientY - lastY, event.clientX - lastX) * (180 / Math.PI);
              moveX(event.clientX);
              moveY(event.clientY);
              gsap.to(cursorOrb, { scaleX: 1 + velocity, scaleY: 1 - velocity * 0.28, rotate: angle, autoAlpha: 1, duration: 0.18, overwrite: "auto" });
              lastX = event.clientX;
              lastY = event.clientY;
            };
            const settleCursor = () => gsap.to(cursorOrb, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, .45)" });
            const hideCursor = () => gsap.to(cursorOrb, { autoAlpha: 0, duration: 0.2 });
            const pressCursor = () => gsap.to(cursorOrb, { scale: 0.58, duration: 0.12 });
            const releaseCursor = () => gsap.to(cursorOrb, { scale: 1, duration: 0.38, ease: "back.out(2)" });
            const growCursor = () => gsap.to(cursorOrb, { scale: 1.9, duration: 0.25, ease: "power2.out" });
            const interactiveElements = root.querySelectorAll<HTMLElement>("a, button, [data-magnetic]");

            window.addEventListener("pointermove", moveCursor, { passive: true });
            window.addEventListener("pointerup", releaseCursor);
            document.addEventListener("pointerdown", pressCursor);
            document.documentElement.addEventListener("pointerleave", hideCursor);
            document.documentElement.addEventListener("pointerenter", settleCursor);
            interactiveElements.forEach((element) => {
              element.addEventListener("pointerenter", growCursor);
              element.addEventListener("pointerleave", settleCursor);
            });
            cursorCleanups.push(() => {
              window.removeEventListener("pointermove", moveCursor);
              window.removeEventListener("pointerup", releaseCursor);
              document.removeEventListener("pointerdown", pressCursor);
              document.documentElement.removeEventListener("pointerleave", hideCursor);
              document.documentElement.removeEventListener("pointerenter", settleCursor);
              interactiveElements.forEach((element) => {
                element.removeEventListener("pointerenter", growCursor);
                element.removeEventListener("pointerleave", settleCursor);
              });
            });
          }
        }, root);

        ScrollTrigger.refresh();
        dispose = () => {
          magneticCleanups.forEach((cleanup) => cleanup());
          cursorCleanups.forEach((cleanup) => cleanup());
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
