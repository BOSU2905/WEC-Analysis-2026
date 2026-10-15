import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import SiteHeader from "./components/layout/SiteHeader";
import type { ViewType } from "./components/layout/SiteHeader";
import Footer from "./components/layout/Footer";
import Story from "./pages/Story"; // Eager load default view for LCP
import PhotoCreditsModal from "./components/story/PhotoCreditsModal";

const Archive = lazy(() => import("./pages/Archive"));
const About = lazy(() => import("./pages/About"));

const isArchiveHash = (hash: string) => {
  const clean = hash.replace("#", "").toLowerCase().replace(/^\//, "");
  return (
    clean === "archive" ||
    clean === "machines" ||
    clean === "paddock" ||
    clean === "circuits" ||
    clean === "teams" ||
    clean === "teams-dynasties"
  );
};

const resolveViewFromHash = (hash: string): ViewType => {
  const clean = hash.replace("#", "").toLowerCase().replace(/^\//, "");
  if (clean === "about") return "about";
  if (isArchiveHash(clean)) return "archive";
  return "story";
};

function App() {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    if (typeof window !== "undefined") {
      return resolveViewFromHash(window.location.hash);
    }
    return "story";
  });
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const previousViewRef = useRef<ViewType>(currentView);

  useEffect(() => {
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.shiftKey && (e.key === "R" || e.key === "r")) ||
        (e.shiftKey && e.key === "F5") ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          (e.key === "R" || e.key === "r"))
      ) {
        try {
          sessionStorage.removeItem("wec-story-scroll-y");
          sessionStorage.removeItem("wec-active-chapter");
          sessionStorage.setItem("wec-hard-restart", "true");
        } catch {}
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "credits") {
        setIsCreditsOpen(true);
        return;
      }

      const nextView = resolveViewFromHash(hash);

      if (nextView !== previousViewRef.current) {
        previousViewRef.current = nextView;
        try {
          sessionStorage.setItem("wec-navigated-view", "true");
        } catch {}
        setCurrentView(nextView);
        // Navigation between views always starts at the top
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      } else {
        // Direct chapter jump on same page
        if (nextView === "story" && hash.startsWith("chapter-")) {
          const el =
            document.getElementById(hash) ||
            document.getElementById(`${hash}-wrap`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (view: ViewType) => {
    if (view === currentView) {
      if (view === "story") {
        handleResetStory();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }

    try {
      sessionStorage.setItem("wec-navigated-view", "true");
    } catch {}

    previousViewRef.current = view;
    setCurrentView(view);
    const targetHash = `#${view}`;
    if (window.location.hash !== targetHash) {
      history.pushState(null, "", targetHash);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleResetStory = () => {
    try {
      sessionStorage.removeItem("wec-story-scroll-y");
      sessionStorage.removeItem("wec-active-chapter");
    } catch {}
    previousViewRef.current = "story";
    setCurrentView("story");
    if (window.location.hash !== "#story" && window.location.hash !== "") {
      history.pushState(null, "", "#story");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleCloseCredits = () => {
    setIsCreditsOpen(false);
    if (window.location.hash === "#credits") {
      history.replaceState(
        null,
        "",
        window.location.pathname + `#${currentView}`,
      );
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <SiteHeader
        currentView={currentView}
        onBrandClick={handleResetStory}
        onNavigate={handleNavigate}
      />
      <main>
        <Suspense
          fallback={
            <div
              style={{
                padding: "8rem 2rem",
                textAlign: "center",
                fontFamily: "var(--font-mono)",
                color: "var(--color-secondary)",
                letterSpacing: "0.08em",
              }}
            >
              INITIALIZING TELEMETRY...
            </div>
          }
        >
          {currentView === "story" && <Story />}
          {currentView === "archive" && <Archive />}
          {currentView === "about" && <About />}
        </Suspense>
      </main>
      <Footer
        onOpenCredits={() => setIsCreditsOpen(true)}
        onNavigate={handleNavigate}
      />
      <PhotoCreditsModal isOpen={isCreditsOpen} onClose={handleCloseCredits} />
    </LazyMotion>
  );
}

export default App;
