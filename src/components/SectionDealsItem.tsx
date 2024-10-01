import { useNavigate } from "react-router-dom";
import { IProduct } from "../types/types";

interface SectionDealsItem {
    product: IProduct;
}

const SectionDealsItem = ({ product }: SectionDealsItem) => {

    const router = useNavigate(); // useNavigate может перемещатьтся на другую страницу вместо ссылок

    return (
        // если product.id > 4(если id товара больше 4,то даем такие классы,в другом случае если product.id > 0 && product.id < 3(то есть первые 2 товара),то еще одни классы даем,и уже в другом случае,если условия перед этим не выполняются,то ставим просто класс "deals__item",это чтобы указать определенным товарам определенные классы,в данном случае для border)
        <div className={product.id > 4 ? "deals__item deals__item-borderTop" : product.id > 0 && product.id < 3 ? "deals__item deals__item-borderBottom" : product.id === 3 ? "deals__item deals__item3-borderBottom" : "deals__item"}>
            <div className="sectionDeals__link" onClick={()=>router(`/catalog/${product.id}`)}>

                {/* если product.id(id товара равняется такому-то,то указываем у него скидку,это чтобы указать определенным товарам скидку и другие отдельные элементы) */}
                {product.id === 2 || product.id === 5 || product.id === 7 ?
                    <>
                        <div className="sectionTop__right-sale deals__item-discount">
                            <p className="right__sale-text">35% OFF</p>
                        </div>
                        <div className="deals__item-hot">
                            <p className="right__sale-text">HOT</p>
                        </div>
                    </>
                    :
                    ''
                }

                {product.id === 4 ?

                    <div className="sectionTop__right-sale deals__item-discount">
                        <p className="right__sale-text">20% OFF</p>
                    </div>
                    :
                    ''
                }

                {product.id === 7 ?

                    <div className="sectionTop__right-sale deals__item-discount">
                        <p className="right__sale-text">15% OFF</p>
                    </div>
                    :
                    ''
                }

                <img src={product.image} alt="" className="deals__item-img" />
                <p className="deals__item-desc">{product.name}</p>
                <div className="deals__item-priceBlock">

                    {product.id === 2 ?
                        <p className="deals__item-pricePrev">$35</p>
                        : ''
                    }

                    {product.id === 5 ?
                        <p className="deals__item-pricePrev">$120</p>
                        : ''
                    }

                    {product.id === 7 ?
                        <p className="deals__item-pricePrev">$610</p>
                        : ''
                    }

                    {product.id === 4 ?
                        <p className="deals__item-pricePrev">$289</p>
                        : ''
                    }

                    <p className="deals__item-price">${product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default SectionDealsItem;