import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { AuthResponse, IProduct } from "../types/types";
import $api, { API_URL } from "../http/http";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import FormComponent from "../components/FormComponent";
import AuthService from "../services/AuthService";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { useMutation } from "@tanstack/react-query";

const UserPage = () => {

    const [tab, setTab] = useState<string>('dashboard');

    const [typePasses, setTypePasses] = useState({
        typeCurrentPass: true,
        typeNewPass: true,
        typeConfirmPass: true
    })

    const [inputName, setInputName] = useState<string>('');

    const [inputEmail, setInputEmail] = useState<string>('');

    const [changeAccInfoError, setChangeAccInfoError] = useState<string>('');


    const [inputCurrentPass, setInputCurrentPass] = useState<string>('');

    const [inputNewPass, setInputNewPass] = useState<string>('');

    const [inputConfirmPass, setInputConfirmPass] = useState<string>('');

    const [changePassError, setChangePassError] = useState<string>('');


    const [inputNameProduct, setInputNameProduct] = useState<string>('');

    const [selectCategoryValue, setSelectCategoryValue] = useState<string>('');

    const [selectBrandValue, setSelectBrandValue] = useState<string>('');

    const [selectCategoryActive, setSelectCategoryActive] = useState<boolean>(false);

    const [selectBrandActive, setSelectBrandActive] = useState<boolean>(false);

    const [inputPriceValue, setInputPriceValue] = useState<number>(1);


    const [inputFile, setInputFile] = useState<any>(); // состояние для массива файлов,которые пользователь выберет в инпуте для файлов

    const [errorAdminForm, setErrorAdminForm] = useState<string>('');


    // создаем мутацию(запрос на сервер для изменения данных с помощью useMutation),с помощью этой функции создаем новый объект товара 
    const {mutate} = useMutation({
        mutationKey:['add new product'],
        mutationFn:async (product:IProduct) => {
            // указываем тип данных,которые нужно добавить на сервер(в данном случае IProduct)
            await axios.post<IProduct>('http://localhost:5000/catalogProducts',product);
        },
        // при успешной мутации 
        onSuccess(){
            console.log('Succeed mutation')
        }
    })


    const { user, isAuth, isLoading } = useTypedSelector(state => state.userSlice);  // указываем наш слайс(редьюсер) под названием userSlice и деструктуризируем у него поле состояния user,используя наш типизированный хук для useSelector

    const { checkAuthUser, setLoadingUser, logoutUser, setUser } = useActions(); // берем actions для изменения состояния пользователя у слайса(редьюсера) userSlice у нашего хука useActions уже обернутые в диспатч,так как мы оборачивали это в самом хуке useActions


    // фукнция для запроса на сервер на изменение информации пользователя в базе данных,лучше описать эту функцию в сервисе(отдельном файле для запросов типа AuthService),например, но в данном случае уже описали здесь
    const changeAccInfoInDb = async (userId: string, name: string, email: string) => {

        return $api.post('/changeAccInfo', { userId, name, email }); // возвращаем пост запрос на сервер на эндпоинт /changeAccInfo для изменения данных пользователя и передаем вторым параметром объект с полями,используем здесь наш axios с определенными настройками,которые мы задали ему в файле http,чтобы правильно работали запросы на authMiddleware на проверку на access токен на бэкэнде,чтобы когда будет ошибка от бэкэнда от authMiddleware,то будет сразу идти повторный запрос на /refresh на бэкэнде для переобновления access токена и refresh токена и опять будет идти запрос на изменение данных пользователя в базе данных(на /changeAccInfo в данном случае) но уже с переобновленным access токеном,который теперь действителен(это чтобы предотвратить доступ к аккаунту мошенникам,если они украли аккаунт,то есть если access токен будет не действителен уже,то будет запрос на /refresh для переобновления refresh и access токенов, и тогда у мошенников уже будут не действительные токены и они не смогут пользоваться аккаунтом)

    }

    // фукнция для запроса на сервер на изменение пароля пользователя в базе данных
    const changePassInDb = async (userId: string, currentPass: string, newPass: string) => {

        return $api.post('/changePass', { userId, currentPass, newPass }); // возвращаем пост запрос на сервер на эндпоинт /changePass для изменения данных пользователя и передаем вторым параметром объект с полями

    }

    // функция для выхода из аккаунта
    const logout = async () => {
        // оборачиваем в try catch,чтобы отлавливать ошибки 
        try {

            const response = await AuthService.logout(); // вызываем нашу функцию logout() у AuthService

            logoutUser(); // вызываем нашу функцию(action) для изменения состояния пользователя и в данном случае не передаем туда ничего

            setTab('dashboard'); // изменяем состояние таба на dashboard то есть показываем секцию dashboard(в данном случае главный отдел пользователя),чтобы при выходе из аккаунта и входе обратно у пользователя был открыт главный отдел аккаунта,а не настройки или последний отдел,который пользователь открыл до выхода из аккаунта


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

        console.log(user.roles)


    }, [])


    // функция для кнопки изменения имени и почты пользователя
    const changeAccInfo = async () => {

        if (inputName.length < 3 || inputName.length > 20) {
            setChangeAccInfoError('Name must be 3 - 20 characters');
        } else if (!inputEmail.includes('@') || !inputEmail.includes('.') || inputEmail.valueOf().length < 5) {
            // если инпут почты includes('@') false(то есть инпут почты не включает в себя символ @ собаки или не включает в себя точку) или значение инпута почты по количеству символов меньше 5,то показываем ошибку

            setChangeAccInfoError('Enter email correctly');
        } else {

            setChangeAccInfoError(''); // изменяем состояние ошибки на пустую строку,то есть убираем ошибку

            // оборачиваем в try catch,чтобы отлавливать ошибки
            try {

                let name = inputName.trim(); // помещаем в переменную значение инпута имени и убираем у него пробелы с помощю trim() (указываем ей именно let,чтобы можно было изменять)

                name = name.replace(name[0], name[0].toUpperCase()); // заменяем первую букву этой строки инпута имени на первую букву этой строки инпута имени только в верхнем регистре,чтобы имя начиналось с большой буквы,даже если написали с маленькой

                const response = await changeAccInfoInDb(user.id, name, inputEmail); // вызываем нашу функцию запроса на сервер для изменения данных пользователя,передаем туда user.id(id пользователя) и инпуты имени и почты

                console.log(response.data);

                setUser(response.data); // изменяем сразу объект пользователя на данные,которые пришли от сервера,чтобы не надо было обновлять страницу для обновления данных

            } catch (e: any) {
                console.log(e.response?.data?.message); // выводим ошибку в логи

                return setChangeAccInfoError(e.response?.data?.message); // возвращаем и показываем ошибку,используем тут return чтобы если будет ошибка,чтобы код ниже не работал дальше,то есть на этой строчке завершим функцию,чтобы не очищались поля инпутов,если есть ошибка
            }

            setInputEmail(''); // изменяем состояние почты на пустую строку,чтобы убирался текст в инпуте после успешного запроса
            setInputName('');

        }

    }


    // функция для кнопки изменения пароля пользователя,лучше сделать еще authMiddleware на эту функцию на бэкэнде,чтобы проверка была на accessToken
    const changePass = async () => {

        // если инпут текущего пароля равен пустой строке,то показываем ошибку
        if (inputCurrentPass === '') {
            setChangePassError('Enter current password');
        } else if (inputNewPass.length < 3 || inputNewPass.length > 32) {
            // если инпут нового пароля меньше 3 или больше 32,то показываем ошибку
            setChangePassError('New password must be 3 - 32 characters');

        } else if (inputConfirmPass !== inputNewPass) {
            // если значение инпута подтвержденного пароля не равно значению инпута нового пароля,то показываем ошибку
            setChangePassError('Passwords don`t match');
        } else {

            setChangePassError(''); // изменяем состояние ошибки на пустую строку,то есть убираем ошибку

            // оборачиваем в try catch,чтобы отлавливать ошибки
            try {

                const response = await changePassInDb(user.id, inputCurrentPass, inputNewPass); // вызываем нашу функцию запроса на сервер для изменения пароля пользователя,передаем туда user.id(id пользователя) и значения инпутов текущего пароля и нового пароля

                console.log(response.data);


            } catch (e: any) {
                console.log(e.response?.data?.message); // выводим ошибку в логи

                return setChangePassError(e.response?.data?.message); // возвращаем и показываем ошибку,используем тут return чтобы если будет ошибка,чтобы код ниже не работал дальше,то есть на этой строчке завершим функцию,чтобы не очищались поля инпутов,если есть ошибка
            }

            // изменяем состояния инпутов на пустые строки
            setInputConfirmPass('');
            setInputCurrentPass('');
            setInputNewPass('');
        }

    }


    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {

        // изменяем состояние инпута на текущее его значение
        setInputPriceValue(+e.target.value);

    }

    const handlerMinusBtn = () => {
        // если значение инпута количества товара больше 1,то изменяем это значение на - 1,в другом случае указываем ему значение 1,чтобы после нуля не отнимало - 1
        if (inputPriceValue > 1) {
            setInputPriceValue((prev) => prev - 1)
        } else {
            setInputPriceValue(1);
        }
    }

    const handlerPlusBtn = () => {
        // увеличиваем значение инпута на текущее + 1
        setInputPriceValue((prev) => prev + 1);
    }


    // функция для выбора картинки с помощью инпута для файлов
    const labelInputImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // если e.target.files true,то есть пользователь выбрал файл
        if (e.target.files) {

            setInputFile(e.target.files[0]); // помещаем в состояние файла файл под индексом 0 из e.target.files

        }

        // console.log(inputFile); // e.target.files - массив файлов,которые пользователь выбрал при клике на инпут для файлов

    }

    useEffect(() => {
        console.log(inputFile)
    }, [inputFile])


    // функция для обработки формы создания нового товара
    const adminFormHandler = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault(); // убираем дефолтное поведение формы,то есть убираем перезагрузку страницы при клике на любую кнопку формы или enter



    }

    const saveAdminProductHanlder =()=>{
        // если значение инпута названия продукта,из которого убрали пробелы с помощью trim() равно пустой строке,то выводим ошибку(то есть если без пробелов это значение равно пустой строке,то показываем ошибку) или это значение меньше 3
        if(inputNameProduct.trim() === '' || inputNameProduct.trim().length < 3){
            setErrorAdminForm('Enter product name. It must be more than 2 letters');
        }else if(selectCategoryValue === '' || selectBrandValue === ''){
            // если состояния значений селектов категории и бренда пустые,то показываем ошибку
            setErrorAdminForm('Choose category and brand');
        }else if(!inputFile){

            setErrorAdminForm('Choose product image');
            
        }else{

            setErrorAdminForm('');

            let priceFilter; // указываем переменную priceFilter,чтобы ее потом в зависимости от условий изменять

            // если значение инпута цены меньше 20,то изменяем значение priceFilter
            if(inputPriceValue < 20){
                priceFilter = 'Under $20';
            }else if(inputPriceValue >= 20 || inputPriceValue < 100){
                priceFilter = '$20 to $100';
            }else if(inputPriceValue >= 100 || inputPriceValue < 500){
                priceFilter = '$100 to $500';
            }else if(inputPriceValue >= 500 || inputPriceValue < 1000){
                priceFilter = '$500 to $1,000';
            }else if(inputPriceValue >= 1000){
                priceFilter = 'Above $1,000';
            }

            // лучше пока сделать загрузку файла на свой сервер,потом на фронтенд возвращать путь до файла на сервере и этот путь до файла потом сохранять в объекте товара на json server,пока используем просто одну картинку,которая есть на фронтенде для добавления ее в товар
            // const formData = new FormData(); // создаем объект на основе FormData(нужно,чтобы передавать файлы на сервер)
            // formData.append('file',inputFile); // добавляем в этот объект formData по ключу(названию) 'image' сам файл inputFile(состояние для файла) (первым параметром тут передаем название файла,вторым сам файл)


            if(priceFilter){
                // в image пока используем просто путь до одной картинки на фронтенде,чтобы хоть какая-то была пока что
                mutate({name:inputNameProduct,brand:selectBrandValue,category:selectCategoryValue,price:inputPriceValue,priceFilter:priceFilter, amount:1, rating:0, totalPrice:inputPriceValue, image:"/images/sectionCatalog/Image (4).png"} as IProduct); // поле id не указываем,чтобы оно сгенерировалось на сервере автоматически
            }
            

        }

    }



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

                                {/* если user.roles[0] === "USER"(то есть элемент по индексу 0 в поле roles(массив) у user(объект пользователя) равно "USER",то показываем этот таб(то есть если роль у пользователя "USER",то показываем этот таб),в другом случае не показываем */}
                                {user.roles[0] === "USER" &&
                                    <li className="leftBar__list-item">
                                        <button className={tab === 'settings' ? "leftBar__item-btn leftBar__item-btn--active" : "leftBar__item-btn"} onClick={() => setTab('settings')}>
                                            <img src="/images/sectionUserPage/Gear.png" alt="" className="leftBar__btn-img" />
                                            <p className={tab === 'settings' ? "leftBar__btn-text leftBar__btn-text--active" : "leftBar__btn-text"}>Settings</p>
                                        </button>
                                    </li>
                                }


                                {user.roles[0] === "ADMIN" &&
                                    <li className="leftBar__list-item">
                                        <button className={tab === 'adminPanel' ? "leftBar__item-btn leftBar__item-btn--active" : "leftBar__item-btn"} onClick={() => setTab('adminPanel')}>
                                            <img src="/images/sectionUserPage/Gear.png" alt="" className="leftBar__btn-img" />
                                            <p className={tab === 'adminPanel' ? "leftBar__btn-text leftBar__btn-text--active" : "leftBar__btn-text"}>Admin Panel</p>
                                        </button>
                                    </li>
                                }


                            </ul>
                            <div className="leftBar__list-item leftBar__list-itemLogout">
                                <button className="leftBar__item-btn" onClick={logout}>
                                    <img src="/images/sectionUserPage/Logout.png" alt="" className="leftBar__btn-img" />
                                    <p className="leftBar__btn-text">Logout</p>
                                </button>
                            </div>
                        </div>
                        <div className="userPage__mainBlock">

                            {/* если tab === 'dashboard' и если user.roles[0] === "USER"(то есть элемент по индексу 0 в поле roles(массив) у user(объект пользователя) равно "USER",то показываем этот таб(то есть если роль у пользователя "USER",то показываем этот таб),в другом случае не показываем */}
                            {tab === 'dashboard' && user.roles[0] === "USER" &&
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


                            {/* если tab === 'dashboard' и если user.roles[0] === "ADMIN"(то есть элемент по индексу 0 в поле roles(массив) у user(объект пользователя) равно "USER",то показываем этот таб(то есть если роль у пользователя "ADMIN",то показываем этот таб),в другом случае не показываем */}
                            {tab === 'dashboard' && user.roles[0] === "ADMIN" &&
                                <div className="userPage__mainBlock-dashboard">
                                    <h2 className="dashboard__title">Hello, {user.userName}</h2>
                                    <p className="dashboard__text">From your account dashboard. you can easily check & view your <span className="dashboard__text-span" onClick={() => setTab('adminPanel')}>Recent Orders</span>, manage your <span className="dashboard__text-span" onClick={() => setTab('adminPanel')}>Shipping and Billing Addresses</span> and edit your <span className="dashboard__text-span" onClick={() => setTab('adminPanel')}>Password</span> and <span className="dashboard__text-span" onClick={() => setTab('adminPanel')}>Account Details</span>.</p>
                                    <div className="dashboard__accInfo">
                                        <p className="accInfo__title">Account Info</p>
                                        <div className="accInfo__main">
                                            <h3 className="accInfo__main-title">{user.userName}</h3>
                                            <div className="accInfo__main-textBlock">
                                                <p className="accInfo__textBlock-bold">Email:</p>
                                                <p className="accInfo__textBlock-default"> {user.email}</p>
                                            </div>
                                            <button className="accInfo__main-btn" onClick={() => setTab('adminPanel')}>Admin Panel</button>
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
                                                <input type="text" className="emailBlock__input" value={inputName} onChange={(e) => setInputName(e.target.value)} />
                                            </div>
                                            <div className="formBlock__emailBlock accSettings__form-input">
                                                <p className="emailBlock__text">Email</p>
                                                <input type="text" className="emailBlock__input" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                                            </div>

                                            {/* если changeAccInfoError не равна пустой строке,то есть в changeAccInfoError что-то есть,то есть есть ошибка,то показываем текст с ошибкой */}
                                            {changeAccInfoError !== '' && <p className="formBlock__textError">{changeAccInfoError}</p>}

                                            <button className="accSettings__form-btn" onClick={changeAccInfo}>Save Changes</button>
                                        </div>
                                    </div>
                                    <div className="settings__passSettings settings__accSettings">
                                        <h2 className="settings__accSettings-title">Change Password</h2>
                                        <div className="accSettings__form">
                                            <div className="formBlock__passwordBlock">
                                                <p className="emailBlock__text">Current Password</p>
                                                <input type={typePasses.typeCurrentPass ? "password" : "text"} className="emailBlock__input" value={inputCurrentPass} onChange={(e) => setInputCurrentPass(e.target.value)} />
                                                <button className="passwordBlock__eyeBtn" onClick={() => setTypePasses((prev) => ({ ...prev, typeCurrentPass: !prev.typeCurrentPass }))}>
                                                    <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                                </button>
                                            </div>
                                            <div className="formBlock__passwordBlock">
                                                <p className="emailBlock__text">New Password</p>
                                                <input placeholder="3-32 characters" type={typePasses.typeNewPass ? "password" : "text"} className="emailBlock__input" value={inputNewPass} onChange={(e) => setInputNewPass(e.target.value)} />
                                                <button className="passwordBlock__eyeBtn" onClick={() => setTypePasses((prev) => ({ ...prev, typeNewPass: !prev.typeNewPass }))}>
                                                    <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                                </button>
                                            </div>
                                            <div className="formBlock__passwordBlock">
                                                <p className="emailBlock__text">Confirm Password</p>
                                                <input type={typePasses.typeConfirmPass ? "password" : "text"} className="emailBlock__input" value={inputConfirmPass} onChange={(e) => setInputConfirmPass(e.target.value)} />
                                                <button className="passwordBlock__eyeBtn" onClick={() => setTypePasses((prev) => ({ ...prev, typeConfirmPass: !prev.typeConfirmPass }))}>
                                                    <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                                </button>
                                            </div>

                                            {/* если changePassError не равна пустой строке,то есть в changePassError что-то есть,то есть есть ошибка,то показываем текст с ошибкой */}
                                            {changePassError !== '' && <p className="formBlock__textError">{changePassError}</p>}

                                            <button className="accSettings__form-btn" onClick={changePass}>Change Password</button>
                                        </div>
                                    </div>
                                </div>
                            }


                            {tab === 'adminPanel' &&
                                <div className="userPage__mainBlock-dashboard">
                                    <div className="settings__accSettings">
                                        <h2 className="settings__accSettings-title">New product</h2>

                                        <form className="userPage__mainBlock-adminForm accSettings__form" onSubmit={adminFormHandler}>
                                            <div className="formBlock__emailBlock accSettings__form-input adminForm__inputName">
                                                <p className="emailBlock__text">Name</p>
                                                <input type="text" className="emailBlock__input" value={inputNameProduct} onChange={(e) => setInputNameProduct(e.target.value)} />
                                            </div>
                                            <div className="adminForm__blockSelects">
                                                <div className="formBlock__emailBlock accSettings__form-input">
                                                    <p className="emailBlock__text">Category</p>
                                                    <div className="productsBlock__top-selectBlock">
                                                        <div className="selectBlock__select-inner selectBlock__select-inner--adminPanel" onClick={() => setSelectCategoryActive((prev) => !prev)}>
                                                            <div className="selectBlock__select" >
                                                                <p className="select__text select__text-adminPanel">{selectCategoryValue}</p>
                                                                <img src="/images/sectionCatalog/arrowDown.png" alt="" className={selectCategoryActive ? "select__img select__img--active select__img-adminPanel" : "select__img select__img-adminPanel"} />
                                                            </div>
                                                            <div className={selectCategoryActive ? "select__optionsBlock select__optionsBlock--active select__optionsBlock-adminPanel" : "select__optionsBlock"}>
                                                                <div className="optionsBlock__item" onClick={() => setSelectCategoryValue('Electronic Devices')}>
                                                                    <p className="optionsBlock__item-text">Electronic Devices</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectCategoryValue('Laptop')}>
                                                                    <p className="optionsBlock__item-text">Laptop</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectCategoryValue('Computer Accessories')}>
                                                                    <p className="optionsBlock__item-text">Computer Accessories</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectCategoryValue('SmartPhone')}>
                                                                    <p className="optionsBlock__item-text">SmartPhone</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectCategoryValue('Headphones')}>
                                                                    <p className="optionsBlock__item-text">Headphones</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="formBlock__emailBlock accSettings__form-input">
                                                    <p className="emailBlock__text">Brand</p>
                                                    <div className="productsBlock__top-selectBlock">
                                                        <div className="selectBlock__select-inner selectBlock__select-inner--adminPanel" onClick={() => setSelectBrandActive((prev) => !prev)}>
                                                            <div className="selectBlock__select" >
                                                                <p className="select__text select__text-adminPanel">{selectBrandValue}</p>
                                                                <img src="/images/sectionCatalog/arrowDown.png" alt="" className={selectBrandActive ? "select__img select__img--active select__img-adminPanel" : "select__img select__img-adminPanel"} />
                                                            </div>
                                                            <div className={selectBrandActive ? "select__optionsBlock select__optionsBlock--active select__optionsBlock-adminPanel" : "select__optionsBlock"}>
                                                                <div className="optionsBlock__item" onClick={() => setSelectBrandValue('Apple')}>
                                                                    <p className="optionsBlock__item-text">Apple</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectBrandValue('Samsung')}>
                                                                    <p className="optionsBlock__item-text">Samsung</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectBrandValue('Xiaomi')}>
                                                                    <p className="optionsBlock__item-text">Xiaomi</p>
                                                                </div>
                                                                <div className="optionsBlock__item" onClick={() => setSelectBrandValue('LG')}>
                                                                    <p className="optionsBlock__item-text">LG</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="adminPanel__priceInput">
                                                <p className="emailBlock__text">Price</p>
                                                <div className="table__item-inputBlock ">
                                                    <button className="inputBlock__minusBtn" onClick={handlerMinusBtn}>
                                                        <img src="/images/sectionCart/Minus.png" alt="" className="inputBlock__minusImg" />
                                                    </button>
                                                    <input type="number" className="inputBlock__input adminPanel__inputPricePadding" value={inputPriceValue} onChange={changeInputValue} />
                                                    <button className="inputBlock__plusBtn" onClick={handlerPlusBtn}>
                                                        <img src="/images/sectionCart/Plus.png" alt="" className="inputBlock__plusImg" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="adminPanel__imageBlock">
                                                <label htmlFor="inputFile" className="adminPanel__labelInputImage" >
                                                    Load image
                                                    {/* указываем multiple этому инпуту для файлов,чтобы можно было выбирать несколько файлов одновременно для загрузки(в данном случае убрали multiple,чтобы был только 1 файл),указываем accept = "image/*",чтобы можно было выбирать только изображения любого типа */}
                                                    <input accept="image/*" type="file" id="inputFile" className="adminPanel__inputImage" onChange={labelInputImageHandler} />
                                                </label>
                                            </div>

                                            {inputFile &&

                                                <p className="adminPanel__inputFileName">{inputFile.name}</p>

                                            }

                                            {errorAdminForm !== '' && <p className="formBlock__textError adminPanel__textError">{errorAdminForm}</p>}

                                            <button className="accSettings__form-btn adminPanel__saveBtn" onClick={saveAdminProductHanlder}>Save Product</button>

                                        </form>

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