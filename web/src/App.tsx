import SiteHeader from "./components/layout/SiteHeader";
import Hero from "./components/story/Hero";
import Chapter01 from "./chapters/chapter-01/Chapter01";
import Chapter02 from "./chapters/chapter-02/Chapter02";
import ChapterTransition from "./components/story/ChapterTransition";

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Chapter01 />
        <Chapter02 />
        <ChapterTransition
          teaserText="If Toyota outlasted everyone, how did they actually do it?"
          nextChapterNumber="03"
          nextChapterTitle="The Architecture of Dominance"
        />
      </main>
    </>
  );
}

export default App;
