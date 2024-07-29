import { Link } from "react-router-dom";


const ProductItem = () => {

    return (
        <Link to="/catalog/1" className="products__item">
            <img src="/images/sectionCatalog/Image.png" alt="" className="products__item-img" />
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
            <p className="products__item-desc">Samsung Electronics Samsung Galexy S21 5G</p>
            <p className="products__item-price">$2,300</p>
        </Link>
    )
}

export default ProductItem;