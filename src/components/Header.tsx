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


    const { checkAuthUser, setLoadingUser, setAuthUser } = useActions(); // берем actions для изменения состояния пользователя у слайса(редьюсера) userSlice у нашего хука useActions уже обернутые в диспатч,так как мы оборачивали это в самом хуке useActions

    const { isAuth,user } = useTypedSelector(state => state.userSlice);  // указываем наш слайс(редьюсер) под названием userSlice и деструктуризируем у него поле состояния isAuth для проверки,авторизован ли пользователь,используя наш типизированный хук для useSelector

    const { data } = apiBasket.useGetAllProductsBasketQuery(user.email); // делаем запрос на получение всех товаров корзины и передаем в параметре user.email,то есть email зарегестрированного пользователя,чтобы показывать товары корзины для каждого определенного пользователя разные


    // функция для проверки авторизован ли пользователь(валиден ли его refresh токен)
    const checkAuth = async () => {

        setLoadingUser(true); // изменяем поле isLoading состояния пользователя в userSlice на true(то есть пошла загрузка)

        // оборачиваем в try catch,чтобы отлавливать ошибки
        try {

            // здесь используем уже обычный axios,указываем тип в generic,что в ответе от сервера ожидаем наш тип данных AuthResponse,указываем наш url до нашего роутера(/api) на бэкэнде(API_URL мы импортировали из другого нашего файла) и через / указываем refresh(это тот url,где мы выдаем access и refresh токены на бэкэнде),и вторым параметром указываем объект опций,указываем поле withCredentials true(чтобы автоматически с запросом отправлялись cookies)
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

            console.log(response);

            checkAuthUser(response.data); // вызываем нашу функцию(action) для изменения состояния пользователя и передаем туда response.data(в данном случае это объект с полями accessToken,refreshToken и user,которые пришли от сервера)

        } catch (e: any) {

            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e

        } finally {
            // в блоке finally будет выполнен код в независимости от try catch(то есть в любом случае,даже если будет ошибка)
            setLoadingUser(false); // изменяем поле isLoading состояния пользователя в userSlice на false(то есть загрузка закончена)
        }

    }

    // при запуске сайта будет отработан код в этом useEffect
    useEffect(() => {

        // если localStorage.getItem('token') true,то есть по ключу token в localStorage что-то есть
        if (localStorage.getItem('token')) {

            checkAuth(); // вызываем нашу функцию checkAuth(),которую описали выше для проверки авторизован ли пользователь

        }

    }, [])



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