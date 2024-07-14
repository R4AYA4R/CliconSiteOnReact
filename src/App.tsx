import Header from "./components/Header";
import SectionDeals from "./components/SectionDeals";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <>
      <Header/>
      <main className="main">
        <SectionTop/>
        <SectionDeals/>
      </main>
    </>
  );
}

export default App;
