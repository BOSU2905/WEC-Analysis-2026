import { useState, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import SiteHeader from "./components/layout/SiteHeader";
import Footer from "./components/layout/Footer";
import Story from "./pages/Story";
import Archive from "./pages/Archive";

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
      {currentView === "story" ? <Story /> : <Archive />}
      <Footer />
    </LazyMotion>
  );
}

export default App;
