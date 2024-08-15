import { IProduct } from "../types/types";

interface IProductItemCart{
    product:IProduct
}

const ProductItemCart = ({product}:IProductItemCart) => {


    return (
        <div className="table__item-item">
            <div className="table__item-info">
                <img src="/images/sectionCart/crossImg.png" alt="" className="table__item-deleteImg" />
                <img src={product.image} alt="" className="table__item-itemImg" />
                <p className="table__item-desc">{product.name}</p>
            </div>
            <p className="table__item-price">${product.price}</p>
            <div className="table__item-inputBlock">
                <button className="inputBlock__minusBtn">
                    <img src="/images/sectionCart/Minus.png" alt="" className="inputBlock__minusImg" />
                </button>
                <input type="number" className="inputBlock__input" />
                <button className="inputBlock__plusBtn">
                    <img src="/images/sectionCart/Plus.png" alt="" className="inputBlock__plusImg" />
                </button>
            </div>
            <p className="table__item-subTotalPrice">${product.totalPrice}</p>
        </div>
    )
}

export default ProductItemCart;