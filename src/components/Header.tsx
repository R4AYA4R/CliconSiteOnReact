
const Header = ()=>{
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <a href="#" className="logo">
                        <img src="/images/header/Icon.png" alt="" className="logo-img" />
                        <h2 className="logo-title">CLICON</h2>
                    </a>
                    <ul className="header__menuList">
                        <li className="menuList__item">
                            <a href="#" className="menuList__item-link">Home</a>
                        </li>
                        <li className="menuList__item">
                            <a href="#" className="menuList__item-link">Catalog</a>
                        </li>
                        <li className="menuList__item">
                            <a href="#" className="menuList__item-link">About Us</a>
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