import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { Link } from "react-router-dom";

const SectionNew = () => {
    const sectionNewRef=useRef(null);
    const onScreen = useIsOnScreen(sectionNewRef);
    return (
        <section id="sectionNew" ref={sectionNewRef} className={onScreen.sectionNewIntersecting ? "sectionNew sectionNew__active" : "sectionNew"}>
            <div className="container">
                <div className="sectionNew__inner">
                    <div className="sectionNew__left">
                        <div className="sectionNew__left-info">
                            <p className="sectionNew__left-subtitle">INTRODUCING</p>
                            <h1 className="sectionNew__left-title">New Apple
                                Homepod Mini</h1>
                            <p className="sectionNew__text">Jam-packed with innovation, HomePod mini delivers unexpectedly.</p>
                            <Link to="/catalog" className="info__link right__info-link sectionNew__info-link">
                                <p className="info__link-text">Shop Now</p>
                                <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                            </Link>
                        </div>
                        <img src="/images/sectionNew/Image 6.png" alt="" className="sectionNew__left-img" />
                    </div>
                    <div className="sectionNew__right">
                        <div className="sectionNew__right-info">
                            <p className="sectionNew__right-subtitle">INTRODUCING NEW</p>
                            <h1 className="sectionNew__right-title">Xiaomi Mi 11 Ultra
                                12GB+256GB</h1>
                            <p className="sectionNew__right-text">*Data provided by internal laboratories. Industry measurment.</p>
                            <Link to="/catalog" className="info__link right__info-link sectionNew__info-link">
                                <p className="info__link-text">Shop Now</p>
                                <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionNew;