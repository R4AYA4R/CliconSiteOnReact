import { useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";

const FormPage = () => {

    const [typePass,setTypePass] = useState<boolean>(true); // состояние для показа типа инпута для пароля(password или text)

    const mainFormPageRef = useRef(null);

    const onScreen = useIsOnScreen(mainFormPageRef);

    return (
        <main className={onScreen.sectionMainFormPageIntersecting ? "main mainCatalog mainCatalog__active" : "main mainCatalog"} ref={mainFormPageRef} id="formPage">
            <section className="sectionCatalog__top">
                <div className="container">
                    <div className="sectionCatalog__top-inner">
                        <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                        <p className="sectionCatalog__top-text">Home</p>
                        <p className="sectionCatalog__top-text sectionCatalog__top-textCenter">{'>'}</p>
                        <p className="sectionCatalog__top-textActive"> Sign in</p>
                    </div>
                </div>
            </section>
            <section className="sectionFrom">
                <div className="container">
                    <div className="sectionForm__inner">
                        <div className="sectionForm__formBlock">
                            <div className="formBlock__top">
                                <button className="formBlock__top-titleBtn formBlock__top-titleBtnActive">Sign In</button>
                                <button className="formBlock__top-titleBtn">Sign Up</button>
                            </div>

                            <div className="formBlock__signInMain">
                                <div className="formBlock__emailBlock">
                                    <p className="emailBlock__text">Email Address</p>
                                    <input type="text" className="emailBlock__input" />
                                </div>
                                <div className="formBlock__passwordBlock">
                                    <p className="emailBlock__text">Password</p>
                                    <input type={typePass ? "password" : "text"} className="emailBlock__input" />
                                    <button className="passwordBlock__eyeBtn" onClick={()=>setTypePass((prev)=>!prev)}>
                                        <img src="/images/formPage/Eye.png" alt="" className="passwordBlock__img" />
                                    </button>
                                </div>
                                <button className="formBlock__btn">
                                    <p className="info__link-text">Sign in</p>
                                    <img src="/images/sectionTop/ArrowRight.png" alt="" className="info__link-img" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FormPage;