import Footer from "./components/Footer";
import Header from "./components/Header";
import SectionDeals from "./components/SectionDeals";
import SectionMac from "./components/SectionMac";
import SectionNew from "./components/SectionNew";
import SectionSellers from "./components/SectionSellers";
import SectionTop from "./components/SectionTop";


function App() {
  return (
    <>
      <Header/>
      <main className="main">
        <SectionTop/>
        <SectionDeals/>
        <SectionNew/>
        <SectionMac/>
        <SectionSellers/>
      </main>
      <Footer/>
    </>
  );
}

export default App;
