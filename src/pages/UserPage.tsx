import { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "../types/types";
import { API_URL } from "../http/http";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import FormComponent from "../components/FormComponent";
import AuthService from "../services/AuthService";
import { useIsOnScreen } from "../hooks/useIsOnScreen";

const UserPage = () => {

    const [tab, setTab] = useState<string>('dashboard');

    const [typePasses, setTypePasses] = useState({
        typeCurrentPass: true,
        typeNewPass: true,
        typeConfirmPass: true
    })

    const { user, isAuth, isLoading } = useTypedSelector(state => state.userSlice);  // указываем наш слайс(редьюсер) под названием userSlice и деструктуризируем у него поле состояния user,используя наш типизированный хук для useSelector

    const { checkAuthUser, setLoadingUser,logoutUser } = useActions(); // берем actions для изменения состояния пользователя у слайса(редьюсера) userSlice у нашего хука useActions уже обернутые в диспатч,так как мы оборачивали это в самом хуке useActions


    // функция для выхода из аккаунта
    const logout = async () => {
        // оборачиваем в try catch,чтобы отлавливать ошибки 
        try {

            const response = await AuthService.logout(); // вызываем нашу функцию logout() у AuthService

            logoutUser(); // вызываем нашу функцию(action) для изменения состояния пользователя и в данном случае не передаем туда ничего


        } catch (e: any) {
            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e 
        }
    }


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

    // если состояние загрузки true,то есть идет загрузка,то показываем лоадер(загрузку),если не отслеживать загрузку при функции checkAuth(для проверки на refresh токен при запуске страницы),то будет не правильно работать(только через некоторое время,когда запрос на /refresh будет отработан,поэтому нужно отслеживать загрузку и ее возвращать как разметку страницы,пока грузится запрос на /refresh)
    if (isLoading) {
        // возвращаем тег main с классом main,так как указали этому классу стили,чтобы был прижат header и footer
        return (
            <main className="main">
                <div className="container">
                    <div className="innerForLoader">
                        <div className="loader">

                        </div>
                    </div>
                </div>
            </main>
        )
    }


    // если isAuth false,то есть пользователь не авторизован(когда возвращается ошибка от сервера от эндпоинта /refresh в функции checkAuth,то isAuth становится типа false,и тогда пользователя типа выкидывает из аккаунта,то есть в данном случае возвращаем компонент формы регистрации и авторизации),то возвращаем компонент формы,вместо страницы пользователя
    if (!isAuth) {
        return (
            <>
                <FormComponent />
            </>
        )
    }


    return (
        <main className="main" id="userPage">
            <section className="sectionCatalog__top">
                <div className="container">
                    <div className="sectionCatalog__top-inner">
                        <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                        <p className="sectionCatalog__top-text">Home</p>
                        <img src="/images/header/CareRight.png" className="sectionCatalog__top-text sectionCatalog__top-textCenter" />
                        <p className="sectionCatalog__top-textActive">User Account</p>
                    </div>
                </div>
            </section>
            <section className="userPage">
                <div className="container">
                    <div className="userPage__inner">
                        <div className="userPage__leftBar">
                            <ul className="userPage__leftBar-list">
                                <li className="leftBar__list-item">
                                    <button className={tab === 'dashboard' ? "leftBar__item-btn leftBar__item-btn--active" : "leftBar__item-btn"} onClick={() => setTab('dashboard')}>
                                        <img src="/images/sectionUserPage/DashImg (1).png" alt="" className="leftBar__btn-img" />
                                        <p className={tab === 'dashboard' ? "leftBar__btn-text leftBar__btn-text--active" : "leftBar__btn-text"}>Dashboard</p>
                                    </button>
                                </li>
                                <li className="leftBar__list-item">
                                    <button className={tab === 'settings' ? "leftBar__item-btn leftBar__item-btn--active" : "leftBar__item-btn"} onClick={() => setTab('settings')}>
                                        <img src="/images/sectionUserPage/Gear.png" alt="" className="leftBar__btn-img" />
                                        <p className={tab === 'settings' ? "leftBar__btn-text leftBar__btn-text--active" : "leftBar__btn-text"}>Settings</p>
                                    </button>
                                </li>
                            </ul>
                            <div className="leftBar__list-item leftBar__list-itemLogout">
                                <button className="leftBar__item-btn" onClick={logout}>
                                    <img src="/images/sectionUserPage/Logout.png" alt="" className="leftBar__btn-img" />
                                    <p className="leftBar__btn-text">Logout</p>
                                </button>
                            </div>
                        </div>
                        <div className="userPage__mainBlock">

                            {tab === 'dashboard' &&
                                <div className="userPage__mainBlock-dashboard">
                                    <h2 className="dashboard__title">Hello, {user.userName}</h2>
                                    <p className="dashboard__text">From your account dashboard. you can easily check & view your <span className="dashboard__text-span" onClick={() => setTab('settings')}>Recent Orders</span>, manage your <span className="dashboard__text-span" onClick={() => setTab('settings')}>Shipping and Billing Addresses</span> and edit your <span className="dashboard__text-span" onClick={() => setTab('settings')}>Password</span> and <span className="dashboard__text-span" onClick={() => setTab('settings')}>Account Details</span>.</p>
                                    <div className="dashboard__accInfo">
                                        <p className="accInfo__title">Account Info</p>
                                        <div className="accInfo__main">
                                            <h3 className="accInfo__main-title">{user.userName}</h3>
                                            <div className="accInfo__main-textBlock">
                                                <p className="accInfo__textBlock-bold">Email:</p>
                                                <p className="accInfo__textBlock-default"> {user.email}</p>
                                            </div>
                                            <button className="accInfo__main-btn" onClick={() => setTab('settings')}>Edit Account</button>
                                        </div>
                                    </div>
                                </div>
                            }

                            {tab === 'settings' &&
                                <div className="userPage__mainBlock-settings">
                                    <div className="settings__accSettings">
                                        <h2 className="settings__accSettings-title">Account Settings</h2>
                                        <div className="accSettings__form">
                                            <div className="formBlock__emailBlock accSettings__form-input">
                                                <p className="emailBlock__text">Name</p>
                                                <input type="text" className="emailBlock__input" />
                                            </div>
                                            <div className="formBlock__emailBlock accSettings__form-input">
                                                <p className="emailBlock__text">Email</p>
                                                <input type="text" className="emailBlock__input" />
                                            </div>
                                            <button className="accSettings__form-btn">Save Changes</button>
                                        </div>
                                    </div>
                                    <div className="settings__passSettings settings__accSettings">
                                        <h2 className="settings__accSettings-title">Change Password</h2>
                                        <div className="accSettings__form">
                                            <div className="formBlock__passwordBlock">
                                                <p className="emailBlock__text">Current Password</p>
                                                <input type={typePasses.typeCurrentPass ? "password" : "text"} className="emailBlock__input" />
                                                <button className="passwordBlock__eyeBtn" onClick={() => setTypePasses((prev) => ({ ...prev, typeCurrentPass: !prev.typeCurrentPass }))}>
                                                    <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                                </button>
                                            </div>
                                            <div className="formBlock__passwordBlock">
                                                <p className="emailBlock__text">New Password</p>
                                                <input placeholder="3-32 characters" type={typePasses.typeNewPass ? "password" : "text"} className="emailBlock__input" />
                                                <button className="passwordBlock__eyeBtn" onClick={() => setTypePasses((prev) => ({ ...prev, typeNewPass: !prev.typeNewPass }))}>
                                                    <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                                </button>
                                            </div>
                                            <div className="formBlock__passwordBlock">
                                                <p className="emailBlock__text">Confirm Password</p>
                                                <input type={typePasses.typeConfirmPass ? "password" : "text"} className="emailBlock__input" />
                                                <button className="passwordBlock__eyeBtn" onClick={() => setTypePasses((prev) => ({ ...prev, typeConfirmPass: !prev.typeConfirmPass }))}>
                                                    <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                                </button>
                                            </div>
                                            <button className="accSettings__form-btn">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default UserPage;