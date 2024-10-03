import { NavLink, useNavigate } from "react-router-dom";
import { apiBasket } from "../store/apiBasket";
import { useActions } from "../hooks/useActions";
import { AuthResponse } from "../types/types";
import axios from "axios";
import { API_URL } from "../http/http";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AuthService from "../services/AuthService";

const Header = () => {

    const [activeMobileMenu, setActiveMobileMenu] = useState(false);

    const { data } = apiBasket.useGetAllProductsBasketQuery(null);

    const { checkAuthUser, setLoadingUser, setAuthUser } = useActions(); // берем actions для изменения состояния пользователя у слайса(редьюсера) userSlice у нашего хука useActions уже обернутые в диспатч,так как мы оборачивали это в самом хуке useActions

    const { isAuth } = useTypedSelector(state => state.userSlice);  // указываем наш слайс(редьюсер) под названием userSlice и деструктуризируем у него поле состояния isAuth для проверки,авторизован ли пользователь,используя наш типизированный хук для useSelector


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
                            <NavLink to="/about" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>About Us</NavLink>
                        </li>
                        <li className="menuList__item menuList__item-cart">
                            <NavLink to="/cart" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkCartActive" : "menuList__item-link"}>
                                <img src="/images/header/ShoppingCartSimple.png" alt="" className="item__link-img" />
                                <span className="item__link-spanCart">{data?.length}</span>
                            </NavLink>
                        </li>
                        <li className="menuList__item menuList__item-cart">
                            <NavLink to='/user' className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>
                                <img src="/images/header/User.png" alt="" className="item__link-img" />
                            </NavLink>

                        </li>
                    </ul>

                    <ul className={activeMobileMenu ? "header__menuMobileList header__menuMobileListActive" : "header__menuMobileList"}>
                        <li className="menuList__item">
                            <NavLink to="/" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>Home</NavLink>
                        </li>
                        <li className="menuList__item">
                            <NavLink to="/catalog" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>Catalog</NavLink>
                        </li>
                        <li className="menuList__item">
                            <NavLink to="/about" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>About Us</NavLink>
                        </li>

                        <div className="menuMobileList__userCartBlock">
                            <li className="menuList__item menuList__item-cart">
                                <NavLink to="/cart" className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkCartActive" : "menuList__item-link"}>
                                    <img src="/images/header/ShoppingCartSimple.png" alt="" className="item__link-img" />
                                    <span className="item__link-spanCart">{data?.length}</span>
                                </NavLink>
                            </li>
                            <li className="menuList__item menuList__item-cart">
                                <NavLink to='/user' className={({ isActive }) => isActive ? "menuList__item-link menuList__item-linkActive" : "menuList__item-link"}>
                                    <img src="/images/header/User.png" alt="" className="item__link-img" />
                                </NavLink>

                            </li>
                        </div>


                    </ul>

                    <button className="header__menuBtn" onClick={() => setActiveMobileMenu((prev) => !prev)}>
                        <span className={activeMobileMenu ? "menuBtn__span menuBtn__spanActiveScale" : "menuBtn__span"}></span>
                        <span className={activeMobileMenu ? "menuBtn__span menuBtn__spanActiveRotate2" : "menuBtn__span"}></span>
                        <span className={activeMobileMenu ? "menuBtn__span menuBtn__spanActiveRotate3" : "menuBtn__span"}></span>
                        <span className={activeMobileMenu ? "menuBtn__span menuBtn__spanActiveScale" : "menuBtn__span"}></span>
                    </button>

                </div>
            </div>
        </header>
    )
}

export default Header;