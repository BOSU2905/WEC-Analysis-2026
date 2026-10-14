import { useRef, useEffect, useLayoutEffect } from "react";
import Hero from "../components/story/Hero";
import ChapterNav from "../components/layout/ChapterNav";
import Chapter00 from "../chapters/chapter-00/Chapter00";
import Chapter01 from "../chapters/chapter-01/Chapter01";
import Chapter02 from "../chapters/chapter-02/Chapter02";
import Chapter03 from "../chapters/chapter-03/Chapter03";
import Chapter04 from "../chapters/chapter-04/Chapter04";
import Chapter05 from "../chapters/chapter-05/Chapter05";

export default function Story() {
  const isRestoringRef = useRef(true);

  // Deterministic scroll restoration on layout mount (before paint)
  useLayoutEffect(() => {
    isRestoringRef.current = true;

    // Check if hard restart was requested via Shift+R or Brand Logo
    if (sessionStorage.getItem("wec-hard-restart") === "true") {
      sessionStorage.removeItem("wec-hard-restart");
      sessionStorage.removeItem("wec-story-scroll-y");
      sessionStorage.removeItem("wec-active-chapter");
      window.scrollTo(0, 0);
      isRestoringRef.current = false;
      return;
    }

    // Check if URL contains an explicit chapter hash (e.g. #chapter-03)
    const hash = window.location.hash.replace("#", "");
    if (hash && hash.startsWith("chapter-")) {
      const el =
        document.getElementById(hash) ||
        document.getElementById(`${hash}-wrap`);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
      const timer = setTimeout(() => {
        isRestoringRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }

    // Check if internal view navigation occurred
    const wasNavigated = sessionStorage.getItem("wec-navigated-view") === "true";
    if (wasNavigated) {
      sessionStorage.removeItem("wec-navigated-view");
      sessionStorage.removeItem("wec-story-scroll-y");
      sessionStorage.removeItem("wec-active-chapter");
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      isRestoringRef.current = false;
      return;
    }

    // Check navigation type: reload vs initial navigation
    let isReload = false;
    if (typeof performance !== "undefined" && performance.getEntriesByType) {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === "reload";
      }
    }

    // If page reload, restore previous exact scroll position
    if (isReload) {
      const savedScroll = sessionStorage.getItem("wec-story-scroll-y");
      if (savedScroll) {
        const yPos = parseInt(savedScroll, 10);
        if (!isNaN(yPos) && yPos > 0) {
          window.scrollTo({ top: yPos, behavior: "instant" });
          // Verify restoration once layout settles in case document was initially short
          const checkTimer = setTimeout(() => {
            if (window.scrollY < yPos && document.documentElement.scrollHeight > yPos) {
              window.scrollTo({ top: yPos, behavior: "instant" });
            }
          }, 150);
          return () => clearTimeout(checkTimer);
        }
      }
    } else {
      // Fresh navigation without chapter hash always starts at Chapter 00 top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      sessionStorage.removeItem("wec-story-scroll-y");
      sessionStorage.removeItem("wec-active-chapter");
    }

    // Release restoration guard after browser layout has settled
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isRestoringRef.current = false;
      });
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  // Persist scroll position during active reading
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (isRestoringRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isRestoringRef.current) {
            try {
              sessionStorage.setItem(
                "wec-story-scroll-y",
                window.scrollY.toString(),
              );
            } catch {}
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ChapterNav />
      <Hero />
      <Chapter00 />
      <div id="chapter-01-wrap">
        <Chapter01 />
      </div>
      <div id="chapter-02-wrap">
        <Chapter02 />
      </div>
      <div id="chapter-03-wrap">
        <Chapter03 />
      </div>
      <div id="chapter-04-wrap">
        <Chapter04 />
      </div>
      <div id="chapter-05-wrap">
        <Chapter05 />
      </div>
    </>
  );
}
