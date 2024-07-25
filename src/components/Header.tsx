import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <NavLink to="/" className="logo">
                        <img src="/images/header/Icon.png" alt="" className="logo-img" />
                        <h2 className="logo-title">CLICON</h2>
                    </NavLink>
                    <ul className="header__menuList">
                        <li className="menuList__item">
                            <NavLink to="/" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>Home</NavLink>
                        </li>
                        <li className="menuList__item">
                            <NavLink to="/catalog" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>Catalog</NavLink>
                        </li>
                        <li className="menuList__item">
                            <NavLink to="/about" className="menuList__item-link">About Us</NavLink>
                        </li>
                        <li className="menuList__item menuList__item-cart">
                            <a href="#" className="menuList__item-link">
                                <img src="/images/header/ShoppingCartSimple.png" alt="" className="item__link-img" />
                                <span className="item__link-spanCart">0</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;