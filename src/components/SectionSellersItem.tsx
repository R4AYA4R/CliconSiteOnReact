import { useNavigate } from "react-router-dom";
import { IProduct } from "../types/types";

interface SellersItem{
    product:IProduct;
}

const SectionSellersItem = ({product}:SellersItem) => {

    const router = useNavigate(); // useNavigate может перемещатьтся на другую страницу вместо ссылок

    return (
        <div onClick={()=>router(`/catalog/${product.id}`)} className="sectionSellers__flash-item">
            <img src={product.image} alt="" className="flash__item-img" />
            <div className="flash__item-info">
                <p className="flashItem__info-title">{product.name}</p>
                <p className="item__info-price">${product.price}</p>
            </div>
        </div>
    )
}

export default SectionSellersItem;