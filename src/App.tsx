import Header from "./components/Header";
import SectionDeals from "./components/SectionDeals";
import SectionNew from "./components/SectionNew";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <>
      <Header/>
      <main className="main">
        <SectionTop/>
        <SectionDeals/>
        <SectionNew/>
      </main>
    </>
  );
}

export default App;
