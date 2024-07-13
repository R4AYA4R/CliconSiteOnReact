
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
                <div className="sectionTop__desc">
                    <div className="sectionTop__desc-item">
                        <img src="/images/sectionTop/Package.png" alt="" className="desc__item-img" />
                        <div className="desc__item-info">
                            <h3 className="item__info-title">Fasted Delivery</h3>
                            <p className="item__info-text">Delivery in 24/H</p>
                        </div>
                    </div>
                    <div className="sectionTop__desc-item">
                        <img src="/images/sectionTop/Trophy.png" alt="" className="desc__item-img" />
                        <div className="desc__item-info">
                            <h3 className="item__info-title">24 Hours Return</h3>
                            <p className="item__info-text">100% money-back guarantee</p>
                        </div>
                    </div>
                    <div className="sectionTop__desc-item">
                        <img src="/images/sectionTop/CreditCard.png" alt="" className="desc__item-img" />
                        <div className="desc__item-info">
                            <h3 className="item__info-title">Secure Payment</h3>
                            <p className="item__info-text">Your money is safe</p>
                        </div>
                    </div>
                    <div className="sectionTop__desc-item sectionTop__desc-item4">
                        <img src="/images/sectionTop/HeadPhones.png" alt="" className="desc__item-img" />
                        <div className="desc__item-info">
                            <h3 className="item__info-title">Support 24/7</h3>
                            <p className="item__info-text">Live contact/message</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionTop;