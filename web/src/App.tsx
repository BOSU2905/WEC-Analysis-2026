import { useState, useEffect, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import SiteHeader from "./components/layout/SiteHeader";
import Footer from "./components/layout/Footer";
import Story from "./pages/Story"; // Eager load default view for LCP
import PhotoCreditsModal from "./components/story/PhotoCreditsModal";

const Archive = lazy(() => import("./pages/Archive"));

function App() {
  const [currentView, setCurrentView] = useState<"story" | "archive">("story");
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "credits") {
        setIsCreditsOpen(true);
      } else if (
        hash === "archive" ||
        hash === "machines" ||
        hash === "paddock" ||
        hash === "circuits"
      ) {
        setCurrentView("archive");
      } else {
        setCurrentView("story");
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
      <SiteHeader currentView={currentView} />
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
