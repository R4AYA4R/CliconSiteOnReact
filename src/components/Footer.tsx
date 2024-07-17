
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__top">
                    <div className="container">
                        <div className="footer__top-inner">
                            <div className="footer__top-info">
                                <a href="#" className="logo footer__logo">
                                    <img src="/images/header/Icon.png" alt="" className="logo-img" />
                                    <h2 className="logo-title">CLICON</h2>
                                </a>
                                <p className="top__info-subtitle">Customer Supports:</p>
                                <a href="#" className="top__info-number">(629) 555-0129</a>
                                <p className="top__info-address">4517 Washington Ave. Manchester, Kentucky 39495</p>
                                <a href="#" className="top__info-email">info@kinbo.com</a>
                            </div>
                            <ul className="footer__top-list">
                                <li className="top__list-item">
                                    <h1 className="list__item-title">Top Category</h1>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Computer & Laptop</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">SmartPhone</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Headphone</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Accessories</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Camera & Photo</a>
                                </li>
                            </ul>
                            <ul className="footer__top-list">
                                <li className="top__list-item">
                                    <h1 className="list__item-title">Quick links</h1>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Shop Product</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Shoping Cart</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Wishlist</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Compare</a>
                                </li>
                                <li className="top__list-item">
                                    <a href="#" className="list__item-link">Customer Help</a>
                                </li>
                            </ul>
                            <div className="footer__top-download">
                                <h1 className="list__item-title">Download APP</h1>
                                <a href="#" className="top__download-item">
                                    <img src="/images/footer/Group.png" alt="" className="download__item-img" />
                                    <div className="download__item-info">
                                        <p className="download__item-subtitle">Get it now</p>
                                        <p className="download__item-text">Google Play</p>
                                    </div>
                                </a>
                                <a href="#" className="top__download-item">
                                    <img src="/images/footer/Group (1).png" alt="" className="download__item-img" />
                                    <div className="download__item-info">
                                        <p className="download__item-subtitle">Get it now</p>
                                        <p className="download__item-text">App Store</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="container">
                        <p className="footer__bottom-text">Kinbo - eCommerce Template © 2021. Design by Templatecookie</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;