
const SectionTop = () => {
    return (
        <section className="sectionTop">
            <div className="container">
                <div className="sectionTop__inner">
                    <div className="sectionTop__left">
                        <div className="sectionTop__left-info">
                            <p className="info__subtitle">THE BEST PLACE TO PLAY</p>
                            <h1 className="info__title">Xbox Consoles</h1>
                            <p className="info__desc">Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.</p>
                            <a href="#" className="info__link">
                                <p className="info__link-text">Shop Now</p>
                                <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                            </a>
                        </div>
                        <img src="/images/sectionTop/Image.png" alt="" className="sectionTop__left-img" />
                    </div>
                    <div className="sectionTop__right">
                        <div className="sectionTop__right-topBlock">
                            <div className="sectionTop__right-info">
                                <p className="right__info-subtitle">Summer Sales</p>
                                <h2 className="right__info-title">New Google Pixel 6 Pro</h2>
                                <a href="#" className="info__link right__info-link">
                                    <p className="info__link-text">Shop Now</p>
                                    <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                                </a>
                            </div>
                            <div className="sectionTop__right-sale">
                                <p className="right__sale-text">29% OFF</p>
                            </div>
                        </div>
                        <div className="sectionTop__right-bottomBlock">
                            <img src="/images/sectionTop/Image 4.png" alt="" className="right__bottomBlock-img" />
                            <div className="right__bottomBlock-info">
                                <h3 className="right__bottomBlock-title">Xiaomi FlipBuds Pro</h3>
                                <p className="right__bottomBlock-price">$299 USD</p>
                                <a href="#" className="info__link right__bottomBlock-link">
                                    <p className="info__link-text">Shop Now</p>
                                    <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionTop;