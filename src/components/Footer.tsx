import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__top">
                    <div className="container">
                        <div className="footer__top-inner">
                            <div className="footer__top-info">
                                <Link to="/" className="logo footer__logo">
                                    <img src="/images/header/Icon.png" alt="" className="logo-img" />
                                    <h2 className="logo-title">CLICON</h2>
                                </Link>
                                <p className="top__info-subtitle">Customer Supports:</p>
                                <Link to="/" className="top__info-number">(629) 555-0129</Link>
                                <p className="top__info-address">4517 Washington Ave. Manchester, Kentucky 39495</p>
                                <Link to="/" className="top__info-email">info@kinbo.com</Link>
                            </div>
                            <ul className="footer__top-list">
                                <li className="top__list-item">
                                    <h1 className="list__item-title">Top Category</h1>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/catalog" className="list__item-link">Computer & Laptop</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/catalog" className="list__item-link">SmartPhone</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/catalog" className="list__item-link">Headphone</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/catalog" className="list__item-link">Accessories</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/catalog" className="list__item-link">Camera & Photo</Link>
                                </li>
                            </ul>
                            <ul className="footer__top-list">
                                <li className="top__list-item">
                                    <h1 className="list__item-title">Quick links</h1>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/catalog" className="list__item-link">Shop Product</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/cart" className="list__item-link">Shoping Cart</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/cart" className="list__item-link">Wishlist</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/" className="list__item-link">Compare</Link>
                                </li>
                                <li className="top__list-item">
                                    <Link to="/about" className="list__item-link">Customer Help</Link>
                                </li>
                            </ul>
                            <div className="footer__top-download">
                                <h1 className="list__item-title">Download APP</h1>
                                <Link to="/" className="top__download-item">
                                    <img src="/images/footer/Group.png" alt="" className="download__item-img" />
                                    <div className="download__item-info">
                                        <p className="download__item-subtitle">Get it now</p>
                                        <p className="download__item-text">Google Play</p>
                                    </div>
                                </Link>
                                <Link to="/" className="top__download-item">
                                    <img src="/images/footer/Group (1).png" alt="" className="download__item-img" />
                                    <div className="download__item-info">
                                        <p className="download__item-subtitle">Get it now</p>
                                        <p className="download__item-text">App Store</p>
                                    </div>
                                </Link>
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