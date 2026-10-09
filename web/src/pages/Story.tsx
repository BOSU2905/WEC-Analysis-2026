import { lazy, Suspense, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Hero from "../components/story/Hero";
import ChapterNav from "../components/layout/ChapterNav";
import Chapter00 from "../chapters/chapter-00/Chapter00";

const loadCh1 = () => import("../chapters/chapter-01/Chapter01");
const loadCh2 = () => import("../chapters/chapter-02/Chapter02");
const loadCh3 = () => import("../chapters/chapter-03/Chapter03");
const loadCh4 = () => import("../chapters/chapter-04/Chapter04");
const loadCh5 = () => import("../chapters/chapter-05/Chapter05");

const Ch1 = lazy(loadCh1);
const Ch2 = lazy(loadCh2);
const Ch3 = lazy(loadCh3);
const Ch4 = lazy(loadCh4);
const Ch5 = lazy(loadCh5);

function LazyChapter({ id, component: Component, preloadNext }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "1000px 0px" });

  useEffect(() => {
    if (isInView && preloadNext) {
      console.log(`[Story] LazyChapter ${id} triggers preloadNext at ${performance.now().toFixed(1)}ms`);
      preloadNext();
    }
  }, [isInView, preloadNext, id]);

  return (
    <div id={id} ref={ref}>
      {isInView ? (
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Component />
        </Suspense>
      ) : (
        <div style={{ minHeight: "100vh" }} />
      )}
    </div>
  );
}

export default function Story() {
  useEffect(() => {
    // Schedule background preparation of all chunks to prevent fast-scroll blanking
    const prepareUpcoming = () => {
      // Small delay allows Hero/Ch00 to render and settle before hitting network
      setTimeout(() => {
        loadCh1()
          .then(() => loadCh2())
          .then(() => loadCh3())
          .then(() => loadCh4())
          .then(() => loadCh5())
          .catch(() => {}); // ignore network failures on preload
      }, 1000);
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(prepareUpcoming);
    } else {
      prepareUpcoming();
    }
  }, []);

  return (
    <>
      <ChapterNav />
      <main>
        <Hero />
        <Chapter00 />
        <LazyChapter id="chapter-01-wrap" component={Ch1} preloadNext={loadCh2} />
        <LazyChapter id="chapter-02-wrap" component={Ch2} preloadNext={loadCh3} />
        <LazyChapter id="chapter-03-wrap" component={Ch3} preloadNext={loadCh4} />
        <LazyChapter id="chapter-04-wrap" component={Ch4} preloadNext={loadCh5} />
        <LazyChapter id="chapter-05-wrap" component={Ch5} preloadNext={null} />
      </main>
    </>
  );
}
