import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";

const SectionTeam = () => {

    const sectionTeamRef = useRef(null);

    const onScreen = useIsOnScreen(sectionTeamRef);

    return (
        <section className="sectionTeam">
            <div className="container">
                <div className={onScreen.sectionTeamIntersecting ? "sectionTeam__inner sectionTeam__inner--active" : "sectionTeam__inner"} ref={sectionTeamRef} id="sectionTeam">
                    <h1 className="sectionTeam__title">Our core team member</h1>
                    <div className="sectionTeam__team">
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image.png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">Kevin Gilbert</h3>
                                <p className="team__item-text">Chief Executive Officer</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (1).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">Bob Aterton</h3>
                                <p className="team__item-text">Assistant of CEO</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (2).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">David Galbraith</h3>
                                <p className="team__item-text">Head of Designer</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (3).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">Michael Egerton</h3>
                                <p className="team__item-text">UX Designer</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (4).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">John Caisley</h3>
                                <p className="team__item-text">Product Designer</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (5).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">Thomas Ovard</h3>
                                <p className="team__item-text">Head of Development</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (6).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">Mayson Coppen</h3>
                                <p className="team__item-text">Design Engineer</p>
                            </div>
                        </div>
                        <div className="team__item">
                            <img src="/images/sectionAbout/Image (7).png" alt="" className="team__item-img" />
                            <div className="team__info">
                                <h3 className="team__item-title">Margaret Ravens</h3>
                                <p className="team__item-text">UI Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionTeam;