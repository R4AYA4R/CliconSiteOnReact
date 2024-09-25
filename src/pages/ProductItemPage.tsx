import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthResponse, IComment, IProduct } from "../types/types";
import SectionSellers from "../components/SectionSellers";
import { apiBasket } from "../store/apiBasket";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { API_URL } from "../http/http";



const ProductItemPage = () => {

    const router = useNavigate(); // используем useNavigate чтобы перекидывать пользователя на определенную страницу

    const [tab, setTab] = useState<string>('desc');

    const [inputValue, setInputValue] = useState<number>(1);

    const [formActive, setFormActive] = useState(false);

    const [activeStarsForm, setActiveStarsForm] = useState(0);

    const [inputFormName, setInputFormName] = useState('');

    const [textFormArea, setTextFormArea] = useState('');

    const [errorFormMessage, setErrorFormMessage] = useState('');

    // const [commentsRatingMain, setCommentsRatingMain] = useState(0);

    const sectionProductPage = useRef(null);
    const onScreen = useIsOnScreen(sectionProductPage);

    const params = useParams(); //useParams выцепляет параметр из url (в данном случае id товара)

    const {pathname} = useLocation(); // берем pathname(url страницы) из useLocation()


    const { user, isAuth, isLoading } = useTypedSelector(state => state.userSlice);  // указываем наш слайс(редьюсер) под названием userSlice и деструктуризируем у него поле состояния user,используя наш типизированный хук для useSelector

    const { checkAuthUser, setLoadingUser, logoutUser, setUser } = useActions(); // берем actions для изменения состояния пользователя у слайса(редьюсера) userSlice у нашего хука useActions уже обернутые в диспатч,так как мы оборачивали это в самом хуке useActions


    const [addProductBasket] = apiBasket.useAddProductBasketMutation(); // берем функцию запроса на сервер из нашего api(apiBasket) с помощью нашего хука useAddProductBasketMutation,вторым элементом,который можно взять у этого хука,это все состояния,которые rtk query автоматически создает,а также data(данные запроса)

    const { data: dataBasket } = apiBasket.useGetAllProductsBasketQuery(null); // делаем запрос на сервер для получения всех объектов в корзине,чтобы сделать проверку на существующий товар в корзине,указываем в параметре useGetAllProductsBasketQuery null,так как используем typescript


    const { data, refetch } = useQuery({
        queryKey: ['productIdPage'],
        queryFn: async () => {
            // делаем запрос на сервер по конкретному id,который достали из url,указываем тип данных,которые вернет сервер(в данном случае наш IProduct для товара)
            const response = await axios.get<IProduct>(`http://localhost:5000/catalogProducts/${params.id}`)

            return response;
        }
    })

    const [priceProduct, setPriceProduct] = useState(data?.data.price);

    const isExistsBasket = dataBasket?.some(p => p.name === data?.data.name); // делаем проверку методом some и результат записываем в переменную isExistsBasket,если в dataBasket(в массиве объектов корзины) есть элемент name которого равен data?.data name(то есть name этого товара)

    // делаем запрос на изменение рейтинга у товара
    const { mutate: mutateRating } = useMutation({
        mutationKey: ['mutate ratingProduct'],
        mutationFn: async (product: IProduct) => {
            // в этом запросе для изменения рейтинга нужно указать id как у data?.data,а не params.id,иначе не работает нормально
            await axios.put<any, any, IProduct>(`http://localhost:5000/catalogProducts/${data?.data.id}`, product);
        },
        // при успешной мутации(изменения) рейтинга,переобновляем данные товара
        onSuccess() {
            refetch();
        }
    })


    // делаем запрос на получение комментариев
    const { data: dataComments, refetch: refetchComments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {

            const response = await axios.get<IComment[]>(`http://localhost:5000/comments?nameFor=${data?.data.name}`); // получаем массив комментариев,у которых поле nameFor со значением как название товара

            return response;
        }
    })

    // функция для post запроса на сервер с помощью useMutation(react query),создаем комментарий на сервере,берем mutate у useMutation,чтобы потом вызвать эту функцию запроса на сервер в нужный момент
    const { mutate } = useMutation({
        mutationKey: ['create comment'],
        mutationFn: async (comment: IComment) => {
            // делаем запрос на сервер и добавляем данные на сервер,указываем тип данных,которые нужно добавить на сервер(в данном случае IComment),но здесь не обязательно указывать тип,делаем тип объекта,который мы передаем на сервер as IComment(id вручную не указываем,чтобы он сам генерировался автоматически на сервере)
            await axios.post<IComment>('http://localhost:5000/comments', comment);
        },
        // при успешной мутации переобновляем массив комментариев
        onSuccess() {
            refetchComments();
        }
    })


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

    const formHandler = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // если значение textarea и input (.trim()-убирает из строки пробелы,чтобы нельзя было ввести только пробел) в форме комментария будет пустой строчкой(то есть пользователь ничего туда не ввел),будем изменять состояние ErrorFormMessage(то есть показывать ошибку и не отправлять комментарий),в другом случае очищаем поля textarea и input формы и убираем форму

        // if (inputFormName.trim() === '' || textFormArea.trim() === '' || activeStarsForm === 0) {
        //     setErrorFormMessage('Fill out all form fields and rating');
        // } else if (inputFormName.trim().length <= 2) {
        //     setErrorFormMessage('Name must be more than 2 characters');
        // } 

        // убрали проверки выше на inputFormName потому что уже не используем,так как показываем уже сразу имя пользователя(если он авторизован)
        if (textFormArea.trim().length <= 10) {
            setErrorFormMessage('Comment must be more than 10 characters');
        } else if(activeStarsForm == 0){
            // если состояние активных звезд рейтинга равно 0,то показываем ошибку,чтобы пользователь указал рейтинг
            setErrorFormMessage('Enter rating');
        } else {

            mutate({ name: user.userName, nameFor: data?.data.name, text: textFormArea, rating: activeStarsForm } as IComment); // вызываем функцию post запроса на сервер,создавая комментарий,разворачивая в объект нужные поля для комментария и давая этому объекту тип as IComment(вручную не указываем id,чтобы он автоматически создавался на сервере)


            setInputFormName('');
            setTextFormArea('');
            setActiveStarsForm(0);
            setErrorFormMessage('');
            setFormActive(false);
        }

    }

    useEffect(() => {

        refetchComments();

    }, [dataComments?.data, data?.data])

    // при изменении pathname(url страницы),делаем запрос на обновление данных о товаре(иначе не меняются данные) и изменяем таб на desc(описание товара),если вдруг был включен другой таб,то при изменении url страницы будет включен опять дефолтный таб,также изменяем значение количества товара,если было выбрано уже какое-то,чтобы поставить первоначальное
    useEffect(()=>{

        refetch();

        setTab('desc');

        setInputValue(1);

    },[pathname])

    useEffect(() => {
        const commentsRating = dataComments?.data.reduce((prev, curr) => prev + curr.rating, 0); // проходимся по массиву объектов комментариев,отфильтрованных для каждого товара по имени и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).rating ,это чтобы посчитать общую сумму всего рейтинга от каждого комментария и потом вывести среднее значение

        //если commentsRating true(эта переменная есть и равна чему-то) и dataComments?.data.length true(этот массив отфильтрованных комментариев есть),то считаем средний рейтинг всех комментариев и записываем его в переменную,а потом в состояние,чтобы отобразить рейтинг
        if (dataComments?.data.length && commentsRating) {

            const commentsRatingMiddle = commentsRating / dataComments?.data.length; // считаем средний рейтинг комментариев для каждого товара,делим общее количество рейтинга каждого комменатрия на количество комментариев для каждого товара

            // делаем запрос на изменение рейтинга у товара
            mutateRating({ ...data?.data, rating: commentsRatingMiddle } as IProduct);

            // setCommentsRatingMain(commentsRatingMiddle);

        } else {
            // setCommentsRatingMain(0);
        }

    }, [dataComments?.data])


    // при изменении inputValue и data?.data(в данном случае данные товара,полученные с сервера,чтобы при запуске страницы сайта уже было значение в priceProduct,без этого стартовое значение priceProduct не становится на data?.data.price) изменяем состояние priceProduct
    useEffect(() => {
        // если data?.data.price true(то есть она есть),то меняем значение priceProduct
        if (data?.data.price) {
            setPriceProduct(data?.data.price * inputValue);
        }

    }, [inputValue, data?.data])


    const addToCart = async () => {
        await addProductBasket({ name: data?.data.name, category: data?.data.category, image: data?.data.image, price: data?.data.price, rating: data?.data.rating, priceFilter: data?.data.priceFilter, amount: inputValue, totalPrice: priceProduct, id: data?.data.id } as IProduct); // передаем в addProductBasket объект типа IProduct только таким образом,разворачивая в объект все необходимые поля(то есть наш product,в котором полe name,делаем поле name со значением,как и у этого товара name(data?.data.name) и остальные поля также,кроме поля amount и totalPrice,их мы изменяем и указываем как значения inputValue(инпут с количеством) и priceProduct(состояние цены,которое изменяется при изменении inputValue)),указываем тип этого объекта, созданный нами тип IProduct,при создании на сервере не указываем конкретное значение id,чтобы он сам автоматически генерировался на сервере и потом можно было удалить этот объект,в данном случае указываем id как у data?.data.id(id как у этого товара),чтобы потом в корзине при клике на название товара можно было перейти на страницу этого товара с этим id,в данном случае удаление работает
    }


    // функция для проверки авторизован ли пользователь(валиден ли его refresh токен)
    const checkAuth = async () => {

        setLoadingUser(true); // изменяем поле isLoading состояния пользователя в userSlice на true(то есть пошла загрузка)

        // оборачиваем в try catch,чтобы отлавливать ошибки
        try {

            // здесь используем уже обычный axios,указываем тип в generic,что в ответе от сервера ожидаем наш тип данных AuthResponse,указываем наш url до нашего роутера(/api) на бэкэнде(API_URL мы импортировали из другого нашего файла) и через / указываем refresh(это тот url,где мы выдаем access и refresh токены на бэкэнде),и вторым параметром указываем объект опций,указываем поле withCredentials true(чтобы автоматически с запросом отправлялись cookies)
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

            console.log(response);

            checkAuthUser(response.data); // вызываем нашу функцию(action) для изменения состояния пользователя и передаем туда response.data(в данном случае это объект с полями accessToken,refreshToken и user,которые пришли от сервера)

        } catch (e: any) {

            console.log(e.response?.data?.message); // если была ошибка,то выводим ее в логи,берем ее из ответа от сервера  из поля message из поля data у response у e

        } finally {
            // в блоке finally будет выполнен код в независимости от try catch(то есть в любом случае,даже если будет ошибка)
            setLoadingUser(false); // изменяем поле isLoading состояния пользователя в userSlice на false(то есть загрузка закончена)
        }

    }


    // при запуске сайта будет отработан код в этом useEffect
    useEffect(() => {

        // если localStorage.getItem('token') true,то есть по ключу token в localStorage что-то есть
        if (localStorage.getItem('token')) {

            checkAuth(); // вызываем нашу функцию checkAuth(),которую описали выше для проверки авторизован ли пользователь

        }

    }, [])

    // функция для показа формы для создания комментария
    const addCommentBtn = () => {

        console.log(user.userName)

        // если имя пользователя не равно пустой строке,то есть оно есть и пользователь авторизован,то показываем форму,в другом случае перекидываем пользователя на страницу авторизации
        if(user.userName){
            setFormActive(true); // изменяем состояние активной формы,то есть показываем форму для создания комментария
        }else{
            router('/user'); // перекидываем пользователя на страницу авторизации (/user в данном случае)
        }



    }

    return (
        <main className={onScreen.sectionProductPageIntersecting ? "main mainProductPage mainProductPage--active" : "main mainProductPage"} id="sectionProductPage" ref={sectionProductPage}>
            <section className="sectionProductSuperTop">
                <div className="sectionCatalog__top">
                    <div className="container">
                        <div className="sectionCatalog__top-inner">
                            <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                            <p className="sectionCatalog__top-text">Home</p>
                            <img src="/images/header/CareRight.png" className="sectionCatalog__top-text sectionCatalog__top-textCenter"/>
                            <p className="sectionCatalog__top-text">Catalog</p>
                            <img src="/images/header/CareRight.png" className="sectionCatalog__top-text sectionCatalog__top-textCenter"/>
                            <p className="sectionCatalog__top-textActive">{data?.data.name}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionProductTop">
                <div className="container">
                    <div className="sectionProductTop__inner">
                        <div className="sectionProductTop__imgBlock">
                            <img src={data?.data.image} alt="" className="sectionProductTop__imgBlock-img" />
                        </div>
                        <div className="sectionProductTop__infoBlock">
                            <div className="products__item-stars">

                                {data?.data &&
                                    <>
                                        <img src={data?.data.rating === 0 ? "/images/sectionCatalog/StarGray.png" : "/images/sectionCatalog/Star.png"} alt="" className="item__stars-img" />
                                        <img src={data?.data.rating >= 2 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                                        <img src={data?.data.rating >= 3 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                                        <img src={data?.data.rating >= 4 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                                        <img src={data?.data.rating >= 5 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgGray" />
                                    </>
                                }

                            </div>
                            <h2 className="infoBlock__title">{data?.data.name}</h2>
                            <div className="infoBlock__item">
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Brand:</p>
                                    <p className="infoBlock__item-textRight">{data?.data.brand}</p>
                                </div>
                                <div className="infoBlock__item-textBlock">
                                    <p className="infoBlock__item-textLeft">Category:</p>
                                    <p className="infoBlock__item-textRight">{data?.data.category}</p>
                                </div>
                            </div>
                            <p className="infoBlock__price">${priceProduct}</p>

                            {isExistsBasket ?
                                <h3>Already in Cart</h3>
                                :
                                <div className="infoBlock__amountBlock">
                                    <div className="table__item-inputBlock">
                                        <button className="inputBlock__minusBtn" onClick={handlerMinusBtn}>
                                            <img src="/images/sectionCart/Minus.png" alt="" className="inputBlock__minusImg" />
                                        </button>
                                        <input type="number" className="inputBlock__input" value={inputValue} onChange={changeInputValue} />
                                        <button className="inputBlock__plusBtn" onClick={handlerPlusBtn}>
                                            <img src="/images/sectionCart/Plus.png" alt="" className="inputBlock__plusImg" />
                                        </button>
                                    </div>
                                    <button className="amountBlock__btn" onClick={addToCart}>
                                        <p className="amountBlock__btn-text">ADD TO CART</p>
                                        <img src="/images/sectionProductPage/ShoppingCartSimple.png" alt="" className="amountBlock__btn-img" />
                                    </button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
            <section className="sectionDesc">
                <div className="container">
                    <div className="sectionDesc__inner">
                        <div className="sectionDesc__top-tabs">
                            <p className={tab === 'desc' ? "top__tabs-text top__tabs-textActive" : "top__tabs-text"} onClick={() => setTab('desc')}>Description</p>
                            <p className={tab === 'review' ? "top__tabs-text top__tabs-textActive" : "top__tabs-text"} onClick={() => setTab('review')}>Review</p>
                        </div>

                        {tab === 'desc' &&
                            <div className="sectionDesc__desc">
                                <div className="sectionDesc__innerMain">
                                    <div className="desc__info">
                                        <h3 className="desc__info__title">Description</h3>
                                        <p className="desc__info-text">The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.</p>
                                        <p className="desc__info-text">Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.
                                        </p>
                                    </div>
                                    <div className="desc__feature">
                                        <h3 className="desc__info__title">Feature</h3>
                                        <div className="desc__feature-item">
                                            <img src="/images/sectionProductPage/medal.png" alt="" className="feature__item-img" />
                                            <p className="feature__item-text">Free 1 Year Warranty</p>
                                        </div>
                                        <div className="desc__feature-item">
                                            <img src="/images/sectionProductPage/truck.png" alt="" className="feature__item-img" />
                                            <p className="feature__item-text">Free Shipping & Fasted Delivery</p>
                                        </div>
                                        <div className="desc__feature-item">
                                            <img src="/images/sectionProductPage/handshake.png" alt="" className="feature__item-img" />
                                            <p className="feature__item-text">100% Money-back guarantee</p>
                                        </div>
                                        <div className="desc__feature-item">
                                            <img src="/images/sectionProductPage/headphones.png" alt="" className="feature__item-img" />
                                            <p className="feature__item-text">24/7 Customer support</p>
                                        </div>
                                        <div className="desc__feature-item">
                                            <img src="/images/sectionProductPage/card.png" alt="" className="feature__item-img" />
                                            <p className="feature__item-text">Secure payment method</p>
                                        </div>
                                    </div>
                                    <div className="desc__shipInfo">
                                        <h3 className="desc__info__title">Shipping Information</h3>
                                        <div className="shipInfo__item">
                                            <p className="shipInfo__item-title">Courier:</p>
                                            <div className="shipInfo__item-text"> 2 - 4 days, free shipping</div>
                                        </div>
                                        <div className="shipInfo__item">
                                            <p className="shipInfo__item-title">Local Shipping:</p>
                                            <div className="shipInfo__item-text">  up to one week, $19.00
                                            </div>
                                        </div>
                                        <div className="shipInfo__item">
                                            <p className="shipInfo__item-title">UPS Ground Shipping:</p>
                                            <div className="shipInfo__item-text">  4 - 6 days, $29.00
                                            </div>
                                        </div>
                                        <div className="shipInfo__item">
                                            <p className="shipInfo__item-title">Unishop Global Export:</p>
                                            <div className="shipInfo__item-text">  3 - 4 days, $39.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {tab === 'review' &&
                            <div className="reviews__inner">
                                <div className="reviews__innerMain">
                                    <div className="reviews__leftBlock">
                                        {dataComments?.data.length ?
                                            dataComments.data.map((comm) =>
                                                <div className="reviews__leftBlock-comment" key={comm.id}>
                                                    <div className="comment__top">
                                                        <h2 className="comment__top-title">{comm.name}</h2>
                                                        <div className="products__item-stars">
                                                            <img src={comm.rating === 0 ? "/images/sectionCatalog/StarGray.png" : "/images/sectionCatalog/Star.png"} alt="" className="item__stars-img" />
                                                            <img src={comm.rating >= 2 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                                                            <img src={comm.rating >= 3 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                                                            <img src={comm.rating >= 4 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img" />
                                                            <img src={comm.rating >= 5 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgGray" />
                                                        </div>
                                                    </div>
                                                    <p className="comment__desc">{comm.text}</p>
                                                </div>
                                            )
                                            :
                                            <h3>No comments yet.</h3>
                                        }


                                    </div>
                                    <div className="reviews__rightBlock">
                                        <div className="reviews__rightBlock-top">
                                            <button className={formActive ? "rightBlock__top-btn rightBlock__top-btnNone" : "rightBlock__top-btn"} onClick={addCommentBtn}>Add Comment</button>
                                        </div>

                                        <div className={formActive ? "reviews__rightBlock-form" : "reviews__rightBlock-form reviews__rightBlock-formNone"}>
                                            <div className="form__top">

                                                <h2 className="comment__top-title">{user.userName}</h2>

                                                {/* вместо этого инпута имени будет сразу показываться имя пользователя,который авторизован(если он авторизован) */}
                                                {/* <input type="text" className="form__top-inputName" placeholder="Name" value={inputFormName} onChange={(e) => setInputFormName(e.target.value)} /> */}


                                                <div className="products__item-stars commentsForm__item-stars">
                                                    <img src={activeStarsForm === 0 ? "/images/sectionCatalog/StarGray.png" : "/images/sectionCatalog/Star.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={() => setActiveStarsForm(1)} />
                                                    <img src={activeStarsForm >= 2 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={() => setActiveStarsForm(2)} />
                                                    <img src={activeStarsForm >= 3 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={() => setActiveStarsForm(3)} />
                                                    <img src={activeStarsForm >= 4 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgForm" onClick={() => setActiveStarsForm(4)} />
                                                    <img src={activeStarsForm >= 5 ? "/images/sectionCatalog/Star.png" : "/images/sectionCatalog/StarGray.png"} alt="" className="item__stars-img item__stars-imgGray item__stars-imgForm" onClick={() => setActiveStarsForm(5)} />
                                                </div>
                                            </div>
                                            <div className="form__main">
                                                <textarea className="form__textarea" placeholder="Enter your comment" value={textFormArea} onChange={(e) => setTextFormArea(e.target.value)}></textarea>
                                            </div>

                                            {/* если состояние ошибки формы не равно пустой строке,то показываем текст ошибки */}
                                            {errorFormMessage !== '' && <p className="form__errorText">{errorFormMessage}</p>}

                                            <button className="rightBlock__top-btn" onClick={formHandler}>Save Comment</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
            <SectionSellers />
        </main>
    )
}

export default ProductItemPage;