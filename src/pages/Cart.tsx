import { useContext, useEffect, useRef, useState } from "react";
import ProductItemCart from "../components/ProductItemCart";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import SectionSellers from "../components/SectionSellers";
import { apiBasket } from "../store/apiBasket";

const Cart = () => {

    const { data } = apiBasket.useGetAllProductsBasketQuery(null);

    const [deleteProductBasket] = apiBasket.useDeleteProductBasketMutation();

    const [totalCheck,setTotalCheck] = useState<number>();

    const sectionCartRef = useRef(null);
    const onScreen = useIsOnScreen(sectionCartRef);

    const dataCheck = data?.reduce((prev,curr)=> prev + curr.totalPrice,0); // проходимся по массиву объектов корзины и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).totalPrice,это чтобы посчитать общую сумму цены всех товаров

    // функция для удаления всех товаров корзины
    const deleteAllProducts=()=>{
        // проходимся по каждому элементу массива товаров корзины и вызываем мутацию deleteProductBasket и передаем туда product(сам product, каждый товар на каждой итерации,и потом в функции deleteProductBasket будем брать у этого product только id для удаления из корзины(это мы прописали в нашей функции deleteProductBasket))
        data?.forEach(product =>{
            deleteProductBasket(product);
        })

    }

    // при изменении data(массива объектов корзины),изменяем состояние totalCheck на dataCheck,чтобы посчитать общую сумму товаров
    useEffect(()=>{

        setTotalCheck(dataCheck);

    },[data])


    return (
        <main className={onScreen.sectionCartIntersecting ? "main mainCart mainCart--active" : "main mainCart"} ref={sectionCartRef} id="sectionCart">
            <section className="sectionCartTop">
                <div className="sectionCatalog__top">
                    <div className="container">
                        <div className="sectionCatalog__top-inner">
                            <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                            <p className="sectionCatalog__top-text">Home</p>
                            <img src="/images/header/CareRight.png" className="sectionCatalog__top-text sectionCatalog__top-textCenter"></img>
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
                                        <button className="table__bottom-btnUpdate" onClick={deleteAllProducts}>Clear cart</button>
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
                                <p className="totals__item-textRight">${totalCheck}</p>
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

                                {/* если totalCheck true,то есть он есть и он не undefined(totalCheck может быть undefined,если data(объекты товаров корзины) отсутствуют),то показываем общую цену,в другом случае указываем общую цену 0 usd */}
                                {totalCheck ?
                                    <p className="totals__item-totalPrice">${totalCheck + 3.99} USD</p>
                                    : <p className="totals__item-totalPrice">$0 USD</p>
                                }
                                
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