import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";

const SectionTrusted = () => {

    const sectionTrustedRef=useRef(null);
    const onScreen = useIsOnScreen(sectionTrustedRef);

    return (
        <section className={onScreen.sectionTrustedIntersecting ? "sectionTrusted sectionTrusted--active" : "sectionTrusted"} ref={sectionTrustedRef} id="sectionTrusted" >
            <div className="container">
                <h2 className="sectionTrusted__title">Your trusted and
                    reliable retail shop</h2>
                <p className="sectionTrusted__text">Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla elit gravida eget. Nunc consequat auctor urna a placerat.</p>
            </div>
        </section>
    )
}

export default SectionTrusted;