import { useRef } from "react";
import SectionTeam from "../components/SectionTeam";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import SectionSellers from "../components/SectionSellers";
import SectionTrusted from "../components/SectionTrusted";

const AboutPage=()=>{

    const sectionAboutRef = useRef(null);
    const onScreen = useIsOnScreen(sectionAboutRef);

    return(
        <main className="main">
            <section  ref={sectionAboutRef} id="sectionAbout" className={onScreen.sectionAboutIntersecting ? "sectionAbout sectionAbout--active" : "sectionAbout"}>
                <div className="sectionAbout__inner">
                    <div className="container">
                        <div className="sectionAbout__top">
                            <div className="sectionAbout__top-info">
                                <p className="top__info-subtitle">WHO WE ARE</p>
                                <h1 className="top__info-title">Kinbo - largest electronics retail shop in the world.</h1>
                                <p className="top__info-desc">Pellentesque ultrices, dui vel hendrerit iaculis, ipsum velit vestibulum risus, ac tincidunt diam lectus id magna. Praesent maximus lobortis neque sit amet rhoncus. Nullam tempus lectus a dui aliquet, non ultricies nibh elementum. Nulla ac nulla dolor. </p>
                                <div className="top__info-itemDesc">
                                    <img src="/images/sectionAbout/Checks.png" alt="" className="itemDesc__img" />
                                    <p className="itemDesc__text">Great 24/7 customer services.</p>
                                </div>
                                <div className="top__info-itemDesc">
                                    <img src="/images/sectionAbout/Checks.png" alt="" className="itemDesc__img" />
                                    <p className="itemDesc__text">600+ Dedicated employe.</p>
                                </div>
                                <div className="top__info-itemDesc">
                                    <img src="/images/sectionAbout/Checks.png" alt="" className="itemDesc__img" />
                                    <p className="itemDesc__text">50+ Branches all over the world.</p>
                                </div>
                                <div className="top__info-itemDesc">
                                    <img src="/images/sectionAbout/Checks.png" alt="" className="itemDesc__img" />
                                    <p className="itemDesc__text">Over 1 Million Electronics Products</p>
                                </div>
                            </div>
                            <img src="/images/sectionAbout/Img.png" alt="" className="sectionAbout__top-img" />
                        </div>
                    </div>
                </div>
            </section>
            <SectionTeam/>
            <SectionTrusted/>
            <SectionSellers/>
        </main>
    )
}

export default AboutPage;