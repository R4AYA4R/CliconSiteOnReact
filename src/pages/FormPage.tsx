import { FormEvent, useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useActions } from "../hooks/useActions";
import axios from "axios";
import { AuthResponse } from "../types/types";
import { API_URL } from "../http/http";

const FormPage = () => {

    const router = useNavigate(); // используем useNavigate,чтобы перенаправлять пользователя на другие страницы

    const [typePass, setTypePass] = useState<boolean>(true); // состояние для показа типа инпута для пароля(password или text)

    const [typePassSignUp, setTypePassSignUp] = useState<boolean>(true); // состояние для показа типа инпута для пароля(password или text) в форме sign up

    const [typePassConfirm, setTypePassConfirm] = useState<boolean>(true); // состояние для показа типа инпута для подтверждения пароля(password или text) в форме sign up

    const [checkBox, setCheckBox] = useState<boolean>(false); // состояние для чекбокса политики конфиденциальности

    const [tab, setTab] = useState<string>('signIn'); // состояние для переключения формы sing in и sing up

    const [signUpError,setSignUpError] = useState<string>(''); // состояние для ошибки в форме регистрации

    const [signInError,setSignInError] = useState<string>(''); // состояние для ошибки в форме входа в аккаунт


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

            router('/user'); // перенаправляем на страницу пользователя,так как уже зарегестрировались
    
    
        }catch(e:any){
            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e

            setSignInError(e.response?.data?.message); // помещаем в состояние ошибки формы авторизации текст ошибки,которая пришла от сервера
        }

    }


    // функция для регистрации
    const registration = async (email:string,password:string)=>{
        // оборачиваем в try catch,чтобы отлавливать ошибки
        try{
            const response = await AuthService.registration(email,password); // вызываем нашу функцию registration() у AuthService,передаем туда email и password,если запрос прошел успешно,то в ответе от сервера будут находиться токены поле user с объектом пользователя(с полями isActivated,email,id),их и помещаем в переменную response

            console.log(response);

            registrationForUser(response.data); // вызываем нашу функцию(action) для изменения состояния пользователя и передаем туда response.data(в данном случае это объект с полями accessToken,refreshToken и user,которые пришли от сервера)

            
            router('/user'); // перенаправляем на страницу пользователя,так как уже зарегестрировались

        }catch(e:any){
            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e 

            setSignUpError(e.response?.data?.message + '. Fill in all fields correctly'); // помещаем в состояние ошибки формы регистрации текст ошибки,которая пришла от сервера(в данном случае еще и допольнительный текст)
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


    // функция для кнопки регистрации аккаунта
    const signUpBtn=()=>{

        // если checkBox false,то есть чекбокс с политикой конфиденциальности не прожат
        if(!checkBox){

            setSignUpError('You must agree with privacy policy'); // помещаем в состояние ошибки текст ошибки,соответственно показываем ошибку

        }else if(inputPassSignUp !== inputPassConfirmSignUp){
            // если состояние инпута пароля не равно состоянию инпута подтверждения пароля,то показываем ошибку,что пароли не совпадают

            setSignUpError('Passwords don`t match'); // помещаем в состояние ошибки текст ошибки,соответственно показываем ошибку
        }else if(inputEmailSignUp.trim() === '' || inputPassSignUp === '' || inputNameSignUp.trim() === ''){
            // если состояние инпута почты,отфильтрованое без пробелов(с помощью trim(),то есть из этой строки убираются пробелы) равно пустой строке или инпут пароля равен пустой строке,или инпут имени равен пустой строке,то показываем ошибку

            setSignUpError('Fill in all fields');

        }else if(inputPassSignUp.valueOf().length < 3 || inputPassSignUp.valueOf().length > 32){
            // если значение инпута по длине символов меньше 3 или больше 32,то показываем ошибку

            setSignUpError('Password must be 3 - 32 characters');
        }else if(!inputEmailSignUp.includes('@') || !inputEmailSignUp.includes('.') || inputEmailSignUp.valueOf().length < 5){
            // если инпут почты includes('@') false(то есть инпут почты не включает в себя символ @ собаки или не включает в себя точку) или значение инпута почты по количеству символов меньше 5,то показываем ошибку

            setSignUpError('Enter email correctly');

        }else{

            setSignUpError(''); // указываем значение состоянию ошибку пустою строку,то есть ошибки нет

            registration(inputEmailSignUp,inputPassSignUp); // вызываем нашу функцию регистрации и передаем туда состояния инпутов почты и пароля

            

        }
    }

    // функция для кнопки входа в аккаунт,указываем e такой тип
    const signInBtn=()=>{

        if(!inputEmailSignIn.includes('@') || !inputEmailSignIn.includes('.') || inputEmailSignIn.valueOf().length < 5){
            // если инпут почты includes('@') false(то есть инпут почты не включает в себя символ @ собаки или не включает в себя точку) или значение инпута почты по количеству символов меньше 5,то показываем ошибку

            setSignInError('Enter email correctly');
        }else{

            setSignInError(''); // указываем значение состоянию ошибку пустою строку,то есть ошибки нет

            login(inputEmailSignIn,inputPassSignIn); // вызываем нашу функцию авторизации и передаем туда состояния инпутов почты и пароля

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

                                    {/* если signInError не равна пустой строке,то есть в signInError что-то есть,то есть есть ошибка,то показываем текст с ошибкой */}
                                    {signInError !== '' && <p className="formBlock__textError">{signInError}</p>}
                                    

                                    <button className="formBlock__btn" onClick={signInBtn}>
                                        <p className="info__link-text">Sign in</p>
                                        <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                                    </button>
                                </div>
                            }

                            {tab === 'signUp' &&
                                <div className="formBlock__signInMain" >
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
                                        <input type={typePassSignUp ? "password" : "text"} className="emailBlock__input" placeholder="3 - 32 characters" value={inputPassSignUp} onChange={(e)=>setInputPassSignUp(e.target.value)}/>
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

                                    {/* если signUpError не равна пустой строке,то есть в signUpError что-то есть,то есть есть ошибка,то показываем текст с ошибкой */}
                                    {signUpError !== '' && <p className="formBlock__textError">{signUpError}</p>}

                                    <button className="formBlock__btn" onClick={signUpBtn}>
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