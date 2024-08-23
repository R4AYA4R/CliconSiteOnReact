import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { Link } from "react-router-dom";

const SectionMac = () => {
    const sectionMacRef=useRef(null);
    const onScreen = useIsOnScreen(sectionMacRef);
    return (
        <section id="sectionMac" ref={sectionMacRef} className={onScreen.sectionMacIntersecting ? "sectionMac sectionMac__active" : "sectionMac"}>
            <div className="container">
                <div className="sectionMac__inner">
                    <div className="sectionMac__info">
                        <p className="sectionMac__info-subtitle">SAVE UP TO $200.00</p>
                        <h1 className="sectionMac__info-title">Macbook Pro</h1>
                        <p className="sectionMac__info-text">Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage</p>
                        <Link to="/catalog" className="info__link right__info-link sectionNew__info-link">
                            <p className="info__link-text">Shop Now</p>
                            <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                        </Link>
                    </div>
                    <img src="/images/sectionMac/Image.png" alt="" className="sectionMac__info-img" />
                </div>
            </div>
        </section>
    )
}

export default SectionMac;