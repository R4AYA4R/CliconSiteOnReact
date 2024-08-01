import { useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import SectionSellers from "../components/SectionSellers";



const ProductItemPage = () => {

    const [tab, setTab] = useState<string>('desc');

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
                                    <p className="infoBlock__item-textLeft">Availability:</p>
                                    <p className="infoBlock__item-textRight infoBlock__item-textRightStock">In Stock</p>
                                </div>
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Category:</p>
                                    <p className="infoBlock__item-textRight">{data?.data.category}</p>
                                </div>
                            </div>
                            <p className="infoBlock__price">${data?.data.price}</p>
                            <div className="infoBlock__amountBlock">
                                <div className="table__item-inputBlock">
                                    <button className="inputBlock__minusBtn">
                                        <img src="/images/sectionCart/Minus.png" alt="" className="inputBlock__minusImg" />
                                    </button>
                                    <input type="number" className="inputBlock__input" />
                                    <button className="inputBlock__plusBtn">
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
                        <div className="sectionDesc__desc">

                            {tab === 'desc' &&
                                <>
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
                                </>
                            }

                            {tab === 'review' &&
                                <h4>Reviews</h4>
                            }

                        </div>
                    </div>
                </div>
            </section>
            <SectionSellers/>
        </main>
    )
}

export default ProductItemPage;