import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";



const ProductItemPage = () => {

    const sectionProductPage = useRef(null);
    const onScreen = useIsOnScreen(sectionProductPage);

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
                            <p className="sectionCatalog__top-textActive">Macbook Pro</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionProductTop">
                <div className="container">
                    <div className="sectionProductTop__inner">
                        <div className="sectionProductTop__imgBlock">
                            <img src="/images/sectionProductPage/Main Image.png" alt="" className="sectionProductTop__imgBlock-img" />
                        </div>
                        <div className="sectionProductTop__infoBlock">
                            <div className="products__item-stars">
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                                <img src="/images/sectionCatalog/StarGray.png" alt="" className="item__stars-img item__stars-imgGray" />
                            </div>
                            <h2 className="infoBlock__title">2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray</h2>
                            <div className="infoBlock__item">
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Brand:</p>
                                    <p className="infoBlock__item-textRight">Apple</p>
                                </div>
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Category:</p>
                                    <p className="infoBlock__item-textRight">Electronics Devices</p>
                                </div>
                            </div>
                            <p className="infoBlock__price">$1699</p>
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
        </main>
    )
}

export default ProductItemPage;