import { useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import { AuthResponse } from "../types/types";
import { API_URL } from "../http/http";

const FormPage = () => {

    const [typePass, setTypePass] = useState<boolean>(true); // состояние для показа типа инпута для пароля(password или text)

    const [typePassSignUp, setTypePassSignUp] = useState<boolean>(true); // состояние для показа типа инпута для пароля(password или text) в форме sign up

    const [typePassConfirm, setTypePassConfirm] = useState<boolean>(true); // состояние для показа типа инпута для подтверждения пароля(password или text) в форме sign up

    const [checkBox, setCheckBox] = useState<boolean>(false); // состояние для чекбокса политики конфиденциальности

    const [tab, setTab] = useState<string>('signIn'); // состояние для переключения формы sing in и sing up


    const [inputEmailSignIn,setInputEmailSignIn] = useState<string>(''); // состояние для инпута почты в форме singIn

    const [inputPassSignIn,setInputPassSignIn] = useState<string>(''); // состояние для инпута пароля в форме singIn


    // состояния для остальных инпутов формы singUp
    const [inputPassSignUp,setInputPassSignUp] = useState<string>('');

    const [inputPassConfirmSignUp,setInputPassConfirmSignUp] = useState<string>('');

    const [inputEmailSignUp,setInputEmailSignUp] = useState<string>('');

    const [inputNameSignUp,setInputNameSignUp] = useState<string>('');

    const mainFormPageRef = useRef(null);

    const onScreen = useIsOnScreen(mainFormPageRef);


    const { loginForUser,registrationForUser,logoutUser,setLoadingUser,checkAuthUser } = useActions(); // берем action loginForUser для изменения состояния пользователя у слайса(редьюсера) userSlice у нашего хука useActions уже обернутый в диспатч,так как мы оборачивали это в самом хуке useActions


    // функция для логина
    const login = async (email:string,password:string) => {
        // оборачиваем в try catch,чтобы отлавливать ошибки
        try{
            const response = await AuthService.login(email,password); // вызываем нашу функцию login() у AuthService,передаем туда email и password,если запрос прошел успешно,то в ответе от сервера будут находиться токены и поле user с объектом пользователя(с полями isActivated,email,id),их и помещаем в переменную response

            console.log(response);

            loginForUser(response.data); // вызываем нашу функцию(action) для изменения состояния пользователя и передаем туда response.data(в данном случае это объект с полями accessToken,refreshToken и user,которые пришли от сервера)
    
    
        }catch(e:any){
            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e
        }

    }


    // функция для регистрации
    const registration = async (email:string,password:string)=>{
        // оборачиваем в try catch,чтобы отлавливать ошибки
        try{
            const response = await AuthService.registration(email,password); // вызываем нашу функцию registration() у AuthService,передаем туда email и password,если запрос прошел успешно,то в ответе от сервера будут находиться токены поле user с объектом пользователя(с полями isActivated,email,id),их и помещаем в переменную response

            console.log(response);

            registrationForUser(response.data); // вызываем нашу функцию(action) для изменения состояния пользователя и передаем туда response.data(в данном случае это объект с полями accessToken,refreshToken и user,которые пришли от сервера)

        }catch(e:any){
            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e 
        }
    } 

    // функция для выхода из аккаунта
    const logout = async () => {
        // оборачиваем в try catch,чтобы отлавливать ошибки 
        try{

            const response = await AuthService.logout(); // вызываем нашу функцию logout() у AuthService

            logoutUser(); // вызываем нашу функцию(action) для изменения состояния пользователя и в данном случае не передаем туда ничего


        }catch(e:any){
            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e 
        }
    }


    return (
        <main className={onScreen.sectionMainFormPageIntersecting ? "main mainCatalog mainCatalog__active" : "main mainCatalog"} ref={mainFormPageRef} id="formPage">
            <section className="sectionCatalog__top">
                <div className="container">
                    <div className="sectionCatalog__top-inner">
                        <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                        <p className="sectionCatalog__top-text">Home</p>
                        <img src="/images/header/CareRight.png" className="sectionCatalog__top-text sectionCatalog__top-textCenter"/>
                        <p className="sectionCatalog__top-textActive"> Sign In</p>
                    </div>
                </div>
            </section>
            <section className="sectionFrom">
                <div className="container">
                    <div className="sectionForm__inner">
                        <div className="sectionForm__formBlock">
                            <div className="formBlock__top">
                                <button className={tab === 'signIn' ? "formBlock__top-titleBtn formBlock__top-titleBtnActive" : "formBlock__top-titleBtn"} onClick={() => setTab('signIn')}>Sign In</button>
                                <button className={tab === 'signUp' ? "formBlock__top-titleBtn formBlock__top-titleBtnActive" : "formBlock__top-titleBtn"} onClick={() => setTab('signUp')}>Sign Up</button>
                            </div>

                            {tab === 'signIn' &&
                                <div className="formBlock__signInMain">
                                    <div className="formBlock__emailBlock">
                                        <p className="emailBlock__text">Email Address</p>
                                        <input type="text" className="emailBlock__input" value={inputEmailSignIn} onChange={(e)=>setInputEmailSignIn(e.target.value)}/>
                                    </div>
                                    <div className="formBlock__passwordBlock">
                                        <p className="emailBlock__text">Password</p>
                                        <input type={typePass ? "password" : "text"} className="emailBlock__input" value={inputPassSignIn} onChange={(e)=>setInputPassSignIn(e.target.value)}/>
                                        <button className="passwordBlock__eyeBtn" onClick={() => setTypePass((prev) => !prev)}>
                                            <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                        </button>
                                    </div>
                                    <button className="formBlock__btn">
                                        <p className="info__link-text">Sign in</p>
                                        <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                                    </button>
                                </div>
                            }


                            {tab === 'signUp' &&
                                <div className="formBlock__signInMain">
                                    <div className="formBlock__emailBlock">
                                        <p className="emailBlock__text">Name</p>
                                        <input type="text" className="emailBlock__input" value={inputNameSignUp} onChange={(e)=>setInputNameSignUp(e.target.value)}/>
                                    </div>
                                    <div className="formBlock__emailBlock">
                                        <p className="emailBlock__text">Email Address</p>
                                        <input type="text" className="emailBlock__input" value={inputEmailSignUp} onChange={(e)=>setInputEmailSignUp(e.target.value)}/>
                                    </div>
                                    <div className="formBlock__passwordBlock">
                                        <p className="emailBlock__text">Password</p>
                                        <input type={typePassSignUp ? "password" : "text"} className="emailBlock__input" placeholder="8 - 32 characters" value={inputPassSignUp} onChange={(e)=>setInputPassSignUp(e.target.value)}/>
                                        <button className="passwordBlock__eyeBtn" onClick={() => setTypePassSignUp((prev) => !prev)}>
                                            <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                        </button>
                                    </div>
                                    <div className="formBlock__passwordBlock">
                                        <p className="emailBlock__text">Confirm Password</p>
                                        <input type={typePassConfirm ? "password" : "text"} className="emailBlock__input" value={inputPassConfirmSignUp} onChange={(e)=>setInputPassConfirmSignUp(e.target.value)} />
                                        <button className="passwordBlock__eyeBtn" onClick={() => setTypePassConfirm((prev) => !prev)}>
                                            <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                        </button>
                                    </div>

                                    <div className="formBlock__checkBlock">
                                        <label className="filterBar__categories-item formBlock__checkBlock-label" >
                                            <input type="checkbox" className="categories__item-radio" onClick={() => setCheckBox((prev) => !prev)} />
                                            <span className={checkBox ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                        </label>
                                        <p className="categories__item-text">I agree to Clicon <span><Link to='/' className="formBlock__checkBlock-termLink">Terms of Condition</Link></span> and <span><Link to='/' className="formBlock__checkBlock-termLink">Privacy Policy</Link></span>.
                                        </p>
                                    </div>

                                    <button className="formBlock__btn">
                                        <p className="info__link-text">Sign Up</p>
                                        <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                                    </button>
                                </div>
                            }


                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FormPage;