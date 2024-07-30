import { Link, useNavigate} from "react-router-dom";
import { IProduct } from "../types/types";

interface ProductItem{
    product:IProduct;
}

const ProductItem = ({product}:ProductItem) => {

    const router = useNavigate(); // useNavigate может перемещатьтся на другую страницу вместо ссылок

    return (
        <div className="products__item" onClick={()=>router(`/catalog/${product.id}`)}>
            <img src={product.image} alt="" className="products__item-img" />
            <div className="products__item-middleBlock">
                <div className="products__item-stars">
                    <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                    <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                    <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                    <img src="/images/sectionCatalog/Star.png" alt="" className="item__stars-img" />
                    <img src="/images/sectionCatalog/StarGray.png" alt="" className="item__stars-img item__stars-imgGray" />
                </div>
                <p className="item__middleBlock-text">(5)</p>
            </div>
            <p className="products__item-desc">{product.name}</p>
            <p className="products__item-price">${product.price}</p>
        </div>
    )
}

export default ProductItem;