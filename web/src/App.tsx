import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import SiteHeader from "./components/layout/SiteHeader";
import Footer from "./components/layout/Footer";
import Story from "./pages/Story"; // Eager load default view for LCP
import PhotoCreditsModal from "./components/story/PhotoCreditsModal";

const Archive = lazy(() => import("./pages/Archive"));

const isArchiveHash = (hash: string) => {
  const clean = hash.replace("#", "").toLowerCase();
  return (
    clean === "archive" ||
    clean === "machines" ||
    clean === "paddock" ||
    clean === "circuits"
  );
};

function App() {
  const [currentView, setCurrentView] = useState<"story" | "archive">(() => {
    if (typeof window !== "undefined") {
      return isArchiveHash(window.location.hash) ? "archive" : "story";
    }
    return "story";
  });
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const previousViewRef = useRef<"story" | "archive">(currentView);

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

      const nextView = isArchiveHash(hash) ? "archive" : "story";

      if (nextView !== previousViewRef.current) {
        previousViewRef.current = nextView;
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

  const handleNavigate = (view: "story" | "archive") => {
    if (view === currentView) {
      if (view === "story") {
        handleResetStory();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }

    previousViewRef.current = view;
    setCurrentView(view);
    const targetHash = view === "archive" ? "#archive" : "#story";
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
        window.location.pathname +
          (currentView === "archive" ? "#archive" : "#story"),
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
                padding: "5rem",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              Loading...
            </div>
          }
        >
          {currentView === "story" ? <Story /> : <Archive />}
        </Suspense>
      </main>
      <Footer onOpenCredits={() => setIsCreditsOpen(true)} />
      <PhotoCreditsModal isOpen={isCreditsOpen} onClose={handleCloseCredits} />
    </LazyMotion>
  );
}

export default App;
