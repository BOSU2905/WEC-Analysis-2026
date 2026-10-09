import Hero from "../components/story/Hero";
import Chapter00 from "../chapters/chapter-00/Chapter00";
import Chapter01 from "../chapters/chapter-01/Chapter01";
import Chapter02 from "../chapters/chapter-02/Chapter02";
import Chapter03 from "../chapters/chapter-03/Chapter03";
import Chapter04 from "../chapters/chapter-04/Chapter04";
import Chapter05 from "../chapters/chapter-05/Chapter05";
import ChapterNav from "../components/layout/ChapterNav";

export default function Story() {
  return (
    <>
      <ChapterNav />
      <main>
        <Hero />
        <Chapter00 />
        <Chapter01 />
        <Chapter02 />
        <Chapter03 />
        <Chapter04 />
        <Chapter05 />
      </main>
    </>
  );
}
