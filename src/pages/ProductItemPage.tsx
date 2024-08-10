import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import SectionSellers from "../components/SectionSellers";



const ProductItemPage = () => {

    const [tab, setTab] = useState<string>('desc');

    const [inputValue, setInputValue] = useState<number>(1);

    const [formActive,setFormActive] = useState(false);

    const [activeStarsForm,setActiveStarsForm] = useState(0);

    const [inputFormName,setInputFormName] = useState('');

    const [textFormArea,setTextFormArea] = useState('');

    const [errorFormMessage,setErrorFormMessage] = useState('');

    const sectionProductPage = useRef(null);
    const onScreen = useIsOnScreen(sectionProductPage);

    const params = useParams(); //useParams выцепляет параметр из url (в данном случае id товара)

    const { data } = useQuery({
        queryKey: ['productIdPage'],
        queryFn: async () => {
            // делаем запрос на сервер по конкретному id,который достали из url,указываем тип данных,которые вернет сервер(в данном случае наш IProduct для товара)
            const response = await axios.get<IProduct>(`http://localhost:5000/catalogProducts/${params.id}`)

            return response;
        }
    })

    const [priceProduct, setPriceProduct] = useState(data?.data.price);

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        // если текущее значение инпута > 99,то изменяем состояние инпута цены на 99,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число
        if (+e.target.value > 99) {
            setInputValue(99);
        } else if (+e.target.value <= 0) {
            // если текущее значение инпута < или равно 0,то ставим значение инпуту 0,чтобы меньше 0 не уменьшалось
            setInputValue(0);
        } else {
            setInputValue(+e.target.value); // изменяем состояние инпута цены на текущее значение инпута,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число
        }
    }

    const handlerMinusBtn = () => {
        // если значение инпута количества товара больше 1,то изменяем это значение на - 1,в другом случае указываем ему значение 1,чтобы после нуля не отнимало - 1
        if (inputValue > 1) {
            setInputValue((prev) => prev - 1)
        } else {
            setInputValue(1);
        }
    }

    const handlerPlusBtn = () => {
        // если значение инпута количества товара меньше 99 и больше или равно 0,то изменяем это значение на + 1,в другом случае указываем ему значение 99,чтобы больше 99 не увеличивалось
        if (inputValue < 99 && inputValue >= 0) {
            setInputValue((prev) => prev + 1)
        } else {
            setInputValue(99);
        }
    }

    const formHandler =(e:FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        // если значение textarea и input (.trim()-убирает из строки пробелы,чтобы нельзя было ввести только пробел) в форме комментария будет пустой строчкой(то есть пользователь ничего туда не ввел),будем изменять состояние ErrorFormMessage(то есть показывать ошибку и не отправлять комментарий),в другом случае очищаем поля textarea и input формы и убираем форму
        if(inputFormName.trim() === '' || textFormArea.trim() === '' || activeStarsForm === 0){
            setErrorFormMessage('Fill out all form fields and rating');
        }else if(inputFormName.trim().length <= 3){
            setErrorFormMessage('Name must be more than 3 characters');
        }else if(textFormArea.trim().length <= 10){
            setErrorFormMessage('Comment must be more than 10 characters');
        }else{
            setInputFormName('');
            setTextFormArea('');
            setActiveStarsForm(0);
            setErrorFormMessage('');
            setFormActive(false);
        }

    }

    // при изменении inputValue и data?.data(в данном случае данные товара,полученные с сервера,чтобы при запуске страницы сайта уже было значение в priceProduct,без этого стартовое значение priceProduct не становится на data?.data.price) изменяем состояние priceProduct
    useEffect(() => {
        // если data?.data.price true(то есть она есть),то меняем значение priceProduct
        if (data?.data.price) {
            setPriceProduct(data?.data.price * inputValue);
        }

    }, [inputValue, data?.data])

    return (
        <main className={onScreen.sectionProductPageIntersecting ? "main mainProductPage mainProductPage--active" : "main mainProductPage"} id="sectionProductPage" ref={sectionProductPage}>
            <section className="sectionProductSuperTop">
                <div className="sectionCatalog__top">
                    <div className="container">
                        <div className="sectionCatalog__top-inner">
                            <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                            <p className="sectionCatalog__top-text">Home</p>
                            <p className="sectionCatalog__top-text sectionCatalog__top-textCenter">{'>'}</p>
                            <p className="sectionCatalog__top-text">Catalog</p>
                            <p className="sectionCatalog__top-text sectionCatalog__top-textCenter">{'>'}</p>
                            <p className="sectionCatalog__top-textActive">{data?.data.name}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionProductTop">
                <div className="container">
                    <div className="sectionProductTop__inner">
                        <div className="sectionProductTop__imgBlock">
                            <img src={data?.data.image} alt="" className="sectionProductTop__imgBlock-img" />
                        </div>
                        <div className="sectionProductTop__infoBlock">
                            <div className="products__item-stars">
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/StarGray.png" alt="" className="item__stars-img item__stars-imgGray" />
                            </div>
                            <h2 className="infoBlock__title">{data?.data.name}</h2>
                            <div className="infoBlock__item">
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Brand:</p>
                                    <p className="infoBlock__item-textRight">{data?.data.brand}</p>
                                </div>
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Category:</p>
                                    <p className="infoBlock__item-textRight">{data?.data.category}</p>
                                </div>
                            </div>
                            <p className="infoBlock__price">${priceProduct}</p>
                            <div className="infoBlock__amountBlock">
                                <div className="table__item-inputBlock">
                                    <button className="inputBlock__minusBtn" onClick={handlerMinusBtn}>
                                        <img src="/images/sectionCart/Minus.png" alt="" className="inputBlock__minusImg" />
                                    </button>
                                    <input type="number" className="inputBlock__input" value={inputValue} onChange={changeInputValue} />
                                    <button className="inputBlock__plusBtn" onClick={handlerPlusBtn}>
                                        <img src="/images/sectionCart/Plus.png" alt="" className="inputBlock__plusImg" />
                                    </button>
                                </div>
                                <button className="amountBlock__btn">
                                    <p className="amountBlock__btn-text">ADD TO CART</p>
                                    <img src="/images/sectionProductPage/ShoppingCartSimple.png" alt="" className="amountBlock__btn-img" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionDesc">
                <div className="container">
                    <div className="sectionDesc__inner">
                        <div className="sectionDesc__top-tabs">
                            <p className={tab === 'desc' ? "top__tabs-text top__tabs-textActive" : "top__tabs-text"} onClick={() => setTab('desc')}>Description</p>
                            <p className={tab === 'review' ? "top__tabs-text top__tabs-textActive" : "top__tabs-text"} onClick={() => setTab('review')}>Review</p>
                        </div>

                        {tab === 'desc' &&
                            <div className="sectionDesc__desc">
                                <div className="desc__info">
                                    <h3 className="desc__info__title">Description</h3>
                                    <p className="desc__info-text">The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.</p>
                                    <p className="desc__info-text">Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
                                    </p>
                                </div>
                                <div className="desc__feature">
                                    <h3 className="desc__info__title">Feature</h3>
                                    <div className="desc__feature-item">
                                        <img src="/images/sectionProductPage/medal.png" alt="" className="feature__item-img" />
                                        <p className="feature__item-text">Free 1 Year Warranty</p>
                                    </div>
                                    <div className="desc__feature-item">
                                        <img src="/images/sectionProductPage/truck.png" alt="" className="feature__item-img" />
                                        <p className="feature__item-text">Free Shipping & Fasted Delivery</p>
                                    </div>
                                    <div className="desc__feature-item">
                                        <img src="/images/sectionProductPage/handshake.png" alt="" className="feature__item-img" />
                                        <p className="feature__item-text">100% Money-back guarantee</p>
                                    </div>
                                    <div className="desc__feature-item">
                                        <img src="/images/sectionProductPage/headphones.png" alt="" className="feature__item-img" />
                                        <p className="feature__item-text">24/7 Customer support</p>
                                    </div>
                                    <div className="desc__feature-item">
                                        <img src="/images/sectionProductPage/card.png" alt="" className="feature__item-img" />
                                        <p className="feature__item-text">Secure payment method</p>
                                    </div>
                                </div>
                                <div className="desc__shipInfo">
                                    <h3 className="desc__info__title">Shipping Information</h3>
                                    <div className="shipInfo__item">
                                        <p className="shipInfo__item-title">Courier:</p>
                                        <div className="shipInfo__item-text"> 2 - 4 days, free shipping</div>
                                    </div>
                                    <div className="shipInfo__item">
                                        <p className="shipInfo__item-title">Local Shipping:</p>
                                        <div className="shipInfo__item-text">  up to one week, $19.00
                                        </div>
                                    </div>
                                    <div className="shipInfo__item">
                                        <p className="shipInfo__item-title">UPS Ground Shipping:</p>
                                        <div className="shipInfo__item-text">  4 - 6 days, $29.00
                                        </div>
                                    </div>
                                    <div className="shipInfo__item">
                                        <p className="shipInfo__item-title">Unishop Global Export:</p>
                                        <div className="shipInfo__item-text">  3 - 4 days, $39.00</div>
                                    </div>
                                </div>
                            </div>
                        }

                        {tab === 'review' &&
                            <div className="reviews__inner">
                                <div className="reviews__leftBlock">
                                    <div className="reviews__leftBlock-comment">
                                        <div className="comment__top">
                                            <h2 className="comment__top-title">Bob</h2>
                                            <div className="products__item-stars">
                                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                                <img src="/images/sectionCatalog/StarGray.png" alt="" className="item__stars-img item__stars-imgGray" />
                                            </div>
                                        </div>
                                        <p className="comment__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, fugiat quam ut quos asperiores sint dicta ea alias hic labore.</p>
                                    </div>
                                </div>
                                <div className="reviews__rightBlock">
                                    <div className="reviews__rightBlock-top">
                                        <button className={formActive ? "rightBlock__top-btn rightBlock__top-btnNone" : "rightBlock__top-btn"} onClick={()=>setFormActive(true)}>Add Comment</button>
                                    </div>

                                    <div className={formActive ? "reviews__rightBlock-form" : "reviews__rightBlock-form reviews__rightBlock-formNone"}>
                                        <div className="form__top">
                                            <input type="text" className="form__top-inputName" placeholder="Name" value={inputFormName} onChange={(e)=>setInputFormName(e.target.value)}/>
                                            <div className="products__item-stars">
                                                <img src={activeStarsForm === 0 ? "/images/sectionCatalog/StarGray.png" : "/images/sectionCatalog/Star.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={()=>setActiveStarsForm(1)}/>
                                                <img src={activeStarsForm >= 2 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={()=>setActiveStarsForm(2)}/>
                                                <img src={activeStarsForm >= 3 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={()=>setActiveStarsForm(3)}/>
                                                <img src={activeStarsForm >= 4 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={()=>setActiveStarsForm(4)}/>
                                                <img src={activeStarsForm >= 5 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgGray item__stars-imgForm" onClick={()=>setActiveStarsForm(5)}/>
                                            </div>
                                        </div>
                                        <div className="form__main">
                                            <textarea className="form__textarea" placeholder="Enter your comment" value={textFormArea} onChange={(e)=>setTextFormArea(e.target.value)}></textarea>
                                        </div>

                                        {/* если состояние ошибки формы не равно пустой строке,то показываем текст ошибки */}
                                        {errorFormMessage !== '' && <p className="form__errorText">{errorFormMessage}</p>}
                                
                                        <button className="rightBlock__top-btn" onClick={formHandler}>Save Comment</button>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
            <SectionSellers />
        </main>
    )
}

export default ProductItemPage;