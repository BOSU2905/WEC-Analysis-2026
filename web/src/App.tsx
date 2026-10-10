import { useState, useEffect, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import SiteHeader from "./components/layout/SiteHeader";
import Footer from "./components/layout/Footer";
import Story from "./pages/Story"; // Eager load default view for LCP

const Archive = lazy(() => import("./pages/Archive"));

function App() {
  const [currentView, setCurrentView] = useState<"story" | "archive">("story");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "archive") {
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

  return (
    <LazyMotion features={domAnimation}>
      <SiteHeader currentView={currentView} />
      <main>
        <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>}>
          {currentView === "story" ? <Story /> : <Archive />}
        </Suspense>
      </main>
      <Footer />
    </LazyMotion>
  );
}

export default App;
