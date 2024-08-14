import { Link, useNavigate, useParams } from "react-router-dom";
import { IComment, IProduct } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProductItem {
    product: IProduct;
}

const ProductItem = ({ product }: ProductItem) => {

    const router = useNavigate(); // useNavigate может перемещатьтся на другую страницу вместо ссылок

    const [commentsRatingMain, setCommentsRatingMain] = useState(0);

    const [amountReviews, setAmountReviews] = useState<number | undefined>(0);

    const { data: dataComments } = useQuery({
        queryKey: ['commentsProduct'],
        queryFn: async () => {
            // делаем запрос на сервер для получения комментариев 
            const response = await axios.get<IComment[]>(`http://localhost:5000/comments`);

            return response;
        }
    })

    useEffect(() => {

        const dataCommentsForName = dataComments?.data.filter(c => c.nameFor === product.name); // массив данных комментариев фильтруем для каджого товара по его имени

        const commentsRating = dataCommentsForName?.reduce((prev, curr) => prev + curr.rating, 0); // проходимся по массиву объектов комментариев,отфильтрованных для каждого товара по имени и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).rating ,это чтобы посчитать общую сумму всего рейтинга от каждого комментария и потом вывести среднее значение

        setAmountReviews(dataCommentsForName?.length);

        //если commentsRating true(эта переменная есть и равна чему-то) и dataComments?.data.length true(этот массив отфильтрованных комментариев есть),то считаем средний рейтинг всех комментариев и записываем его в переменную,а потом в состояние,чтобы отобразить рейтинг
        if (commentsRating && dataCommentsForName?.length) {

            const commentsRatingMiddle = commentsRating / dataCommentsForName.length; // считаем средний рейтинг комментариев для каждого товара,делим общее количество рейтинга каждого комменатрия на количество комментариев для каждого товара

            setCommentsRatingMain(commentsRatingMiddle);


        } else {
            setCommentsRatingMain(0); // если комментариев нет у этого товара,то меняем состояние рейтинга на 0
        }

    }, [dataComments?.data])

    return (
        <div className="products__item" onClick={() => router(`/catalog/${product.id}`)}>
            <img src={product.image} alt="" className="products__item-img" />
            <div className="products__item-middleBlock">
                <div className="products__item-stars">
                    <img src={commentsRatingMain === 0 ? "/images/sectionCatalog/StarGray.png" : "/images/sectionCatalog/Star.png"} alt="" className="item__stars-img" />
                    <img src={commentsRatingMain  >= 2 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                    <img src={commentsRatingMain  >= 3 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                    <img src={commentsRatingMain  >= 4 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                    <img src={commentsRatingMain  >= 5 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgGray" />
                </div>
                <p className="item__middleBlock-text">({amountReviews})</p>
            </div>
            <p className="products__item-desc">{product.name}</p>
            <p className="products__item-price">${product.price}</p>
        </div>
    )
}

export default ProductItem;