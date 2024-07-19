import SectionDeals from "../components/SectionDeals";
import SectionMac from "../components/SectionMac";
import SectionNew from "../components/SectionNew";
import SectionSellers from "../components/SectionSellers";
import SectionTop from "../components/SectionTop";

const Home = () => {
    return (
        <main className="main">
            <SectionTop />
            <SectionDeals />
            <SectionNew/>
            <SectionMac />
            <SectionSellers />
        </main>
    )
}

export default Home;