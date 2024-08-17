import { useContext, useRef } from "react";
import ProductItemCart from "../components/ProductItemCart";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import SectionSellers from "../components/SectionSellers";
import { apiBasket } from "../store/apiBasket";

const Cart = () => {

    const { data } = apiBasket.useGetAllProductsBasketQuery(null);

    const sectionCartRef = useRef(null);
    const onScreen = useIsOnScreen(sectionCartRef);

    return (
        <main className={onScreen.sectionCartIntersecting ? "main mainCart mainCart--active" : "main mainCart"} ref={sectionCartRef} id="sectionCart">
            <section className="sectionCartTop">
                <div className="sectionCatalog__top">
                    <div className="container">
                        <div className="sectionCatalog__top-inner">
                            <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                            <p className="sectionCatalog__top-text">Home</p>
                            <p className="sectionCatalog__top-text sectionCatalog__top-textCenter">{'>'}</p>
                            <p className="sectionCatalog__top-textActive"> Shopping Cart</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionTableCart">
                <div className="container">
                    <div className="sectionTableCart__inner">
                        <div className="sectionTableCart__table">
                            <div className="table__top">
                                <h2 className="sectionTableCart__title">Shopping Card</h2>
                            </div>
                            <div className="table__names">
                                <p className="table__names-text">Products</p>
                                <p className="table__names-text">Price</p>
                                <p className="table__names-text">Quantity</p>
                                <p className="table__names-text">Sub-Total</p>
                            </div>

                            {data?.length ?
                                <>
                                    <div className="table__items">
                                        {data?.map(product =>
                                            <ProductItemCart key={product.id} product={product}/>
                                        )}
                                    </div>
                                    <div className="table__bottom">
                                        <button className="table__bottom-btnUpdate">Clear cart</button>
                                    </div>
                                </>
                                :
                                <h3 className="table__emptyCartText">Cart is empty</h3>
                            }


                        </div>
                        <div className="sectionTableCart__totals">
                            <h3 className="totals__title">Card Totals</h3>
                            <div className="totals__item">
                                <p className="totals__item-text">Sub-total</p>
                                <p className="totals__item-textRight">$250</p>
                            </div>
                            <div className="totals__item">
                                <p className="totals__item-text">Shipping</p>
                                <p className="totals__item-textRight">Free</p>
                            </div>
                            <div className="totals__item">
                                <p className="totals__item-text">Tax</p>
                                <p className="totals__item-textRight">$3.99</p>
                            </div>
                            <div className="totals__item totals__itemTotal">
                                <p className="totals__item-textTotal">Total</p>
                                <p className="totals__item-totalPrice">$253.99 USD</p>
                            </div>
                            <button className="totals__btn">
                                <p className="totals__btn-text">Proceed to Checkout</p>
                                <img src="/images/sectionTop/ArrowRight.png" alt="" className="totals__btn-img" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Cart;