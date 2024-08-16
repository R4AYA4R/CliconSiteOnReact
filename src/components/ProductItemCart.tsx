import { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "../types/types";

interface IProductItemCart{
    product:IProduct
}

const ProductItemCart = ({product}:IProductItemCart) => {

    const [inputValue,setInputValue] = useState(product.amount);

    const [priceProduct,setPriceProduct] = useState(product.totalPrice);

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

    // при изменении inputValue изменяем состояние priceProduct
    useEffect(()=>{

        setPriceProduct(product.price * inputValue);

    },[inputValue])

    return (
        <div className="table__item-item">
            <div className="table__item-info">
                <img src="/images/sectionCart/crossImg.png" alt="" className="table__item-deleteImg" />
                <img src={product.image} alt="" className="table__item-itemImg" />
                <p className="table__item-desc">{product.name}</p>
            </div>
            <p className="table__item-price">${product.price}</p>
            <div className="table__item-inputBlock">
                <button className="inputBlock__minusBtn" onClick={handlerMinusBtn}>
                    <img src="/images/sectionCart/Minus.png" alt="" className="inputBlock__minusImg" />
                </button>
                <input type="number" className="inputBlock__input" onChange={changeInputValue} value={inputValue}/>
                <button className="inputBlock__plusBtn" onClick={handlerPlusBtn}>
                    <img src="/images/sectionCart/Plus.png" alt="" className="inputBlock__plusImg" />
                </button>
            </div>
            <p className="table__item-subTotalPrice">${priceProduct}</p>
        </div>
    )
}

export default ProductItemCart;