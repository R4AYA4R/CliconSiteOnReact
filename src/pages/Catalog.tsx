import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import ProductItem from "../components/ProductsItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { getPagesArray } from "../utils/getPagesArray";

const Catalog = () => {

    const [filterCategories, setFilterCategories] = useState('');

    const [filterPrice, setFilterPrice] = useState('');

    const [selectActive, setSelectActive] = useState(false);

    const [selectValue, setSelectValue] = useState('');

    const [searchValue, setSearchValue] = useState('');


    const [limit, setLimit] = useState(2); // указываем лимит для максимального количества объектов,которые сможет передать сервер за раз(для пагинации)

    const [page, setPage] = useState(1); // указываем состояние текущей страницы

    // const [totalPages, setTotalPages] = useState(0)

    const { totalPages } = useTypedSelector(state => state.totalPagesReducer); // указываем наш слайс(редьюсер) под названием totalPagesReducer и деструктуризируем у него поле состояния totalPages(в данном случае для общего количества страниц,это не обязательно делать через redux,в данном случае просто для практики и чтобы не забыть),используя наш типизированный хук для useSelector

    const { changeTotalPages } = useActions(); // берем action changeTotalPages для изменения totalPages у нашего хука useActions уже обернутый в диспатч,так как мы оборачивали это в самом хуке useActions

    const [filterBrands, setFilterBrands] = useState({
        appleBrand: false,
        samsungBrand: false,
        lgBrand: false,
        xiaomiBrand: false,
    })

    const mainCatalogRef = useRef(null);

    const onScreen = useIsOnScreen(mainCatalogRef);


    // делаем еще функцию запроса для отображения числа товаров определенных фильтров и категорий без проверок и лимитов
    const {data:dataWithoutLimitAndChecks,refetch:refetchWithoutLimitAndChecks} = useQuery({
        queryKey:['catalogProductsWithoutLimitAndChecks'],
        queryFn: async ()=>{
            // указываем тип,который вернет сервер наш IProduct[],массив товаров,первым параметром в axios.get() указываем переменную url,которую изменяли проверками выше для фильтров
            const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}`);

            return response;
        }
    })

    // делаем еще функцию запроса на сервер для отображения числа товаров,которые были найдены без лимита по страницам,как в пагинации,у data и refetch меняем названия как dataWithoutLimit и refetchWithoutLimit,так как такие названия уже есть в коде ниже
    const {data:dataWithoutLimit,refetch:refetchWithoutLimit} = useQuery({
        queryKey:['catalogProductsWithoutLimit'],
        queryFn: async () => {
            let url = `http://localhost:5000/catalogProducts?name_like=${searchValue}`;

            // делаем проверки, если category,price,brand равны каким-то значениям,то добавляем их к общей переменной url
            if(filterBrands.appleBrand){
                url += '&brand=Apple';
            }
            if(filterBrands.samsungBrand){
                url += '&brand=Samsung';
            }
            if(filterBrands.lgBrand){
                url += '&brand=LG';
            }
            if(filterBrands.xiaomiBrand){
                url += '&brand=Xiaomi';
            }

            if(filterCategories !== ''){
                url += `&category=${filterCategories}`;
            }
            
            if(filterPrice !== ''){
                url += `&priceFilter=${filterPrice}`;
            }

            // указываем тип,который вернет сервер наш IProduct[],массив товаров,первым параметром в axios.get() указываем переменную url,которую изменяли проверками выше для фильтров
            const response = await axios.get<IProduct[]>(url);

            return response;

        }   
    })

    const { data, refetch, error } = useQuery({
        queryKey: ['catalogProducts'],
        queryFn: async () => {

            let url = `http://localhost:5000/catalogProducts?name_like=${searchValue}`;

            // делаем проверки, если category,price,brand равны каким-то значениям,то добавляем их к общей переменной url
            if(filterBrands.appleBrand){
                url += '&brand=Apple';
            }
            if(filterBrands.samsungBrand){
                url += '&brand=Samsung';
            }
            if(filterBrands.lgBrand){
                url += '&brand=LG';
            }
            if(filterBrands.xiaomiBrand){
                url += '&brand=Xiaomi';
            }

            if(filterCategories !== ''){
                url += `&category=${filterCategories}`;
            }
            
            if(filterPrice !== ''){
                url += `&priceFilter=${filterPrice}`;
            }

            if(selectValue !== ''){
                url += `&_sort=rating&_order=desc`;
            }

            // указываем тип,который вернет сервер наш IProduct[],массив товаров,первым параметром в axios.get() указываем переменную url,которую изменяли проверками выше для фильтров,вторым параметром указываем объект с параметрами запроса
            const response = await axios.get<IProduct[]>(url, {
                params: {
                    _limit: limit, // указываем параметр limit для максимального количества объектов,которые сможет передать сервер за раз(для пагинации)
                    _page: page // указываем параметр page(параметр текущей страницы,для пагинации)
                }
            });

            const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для товаров),полученных от сервера в переменную

            // setTotalPages(Math.ceil(totalCount / limit))

            changeTotalPages({ totalCount: totalCount, limit: limit }); // используем наш action для изменения состояния redux,в данном случае она изменяет поле totalPages,в нее передаем объект с полями totalCount и limit(можно указать просто totalCount, вместо totalCount:totalCount,так как ключ и значение одинаковые,но можно и так),эта функция делит totalCount на limit с помощью Math.ceil(),чтобы округлить результат до большего целого числа,для пагинации


            return response;

        }
    })


    // фильтруем данные,которые получили от сервера без проверок и лимитов,и помещаем их в переменные для отображения числа товаров определенных категорий и фильтров
    const filteredElectronics = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'Electronics Devices');

    const filteredLaptop = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'Laptop');

    const filteredComputerAccessories = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'Computer Accessories');

    const filteredSmartPhone = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'SmartPhone');

    const filteredHeadphones = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'Headphones');


    const filteredUnder20 = dataWithoutLimitAndChecks?.data.filter(p => p.priceFilter === 'Under $20');
    
    const filtered20to100 = dataWithoutLimitAndChecks?.data.filter(p => p.priceFilter === '$20 to $100');

    const filtered100to500 = dataWithoutLimitAndChecks?.data.filter(p => p.priceFilter === '$100 to $500');

    const filtered500to1000 = dataWithoutLimitAndChecks?.data.filter(p => p.priceFilter === '$500 to $1,000');

    const filteredAbove1000 = dataWithoutLimitAndChecks?.data.filter(p => p.priceFilter === 'Above $1,000');


    const filteredApple = dataWithoutLimitAndChecks?.data.filter(p => p.brand === 'Apple');

    const filteredSamsung = dataWithoutLimitAndChecks?.data.filter(p => p.brand === 'Samsung');

    const filteredLg = dataWithoutLimitAndChecks?.data.filter(p => p.brand === 'LG');

    const filteredXiaomi = dataWithoutLimitAndChecks?.data.filter(p => p.brand === 'Xiaomi');


    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setPage(1);
    }

    const prevPage = () => {
        // если текущая страница больше или равна 2
        if (page >= 2) {
            setPage((prev) => prev - 1); // изменяем состояние текущей страницы на - 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и отнимаем 1)
        }
    }

    const nextPage = () => {
        // если текущая страница меньше или равна общему количеству страниц - 1(чтобы после последней страницы не переключалось дальше)
        if (page <= totalPages - 1) {
            setPage((prev) => prev + 1); // изменяем состояние текущей страницы на + 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и прибавляем 1)
        }
    }



    // при изменении searchValue,то есть когда пользователь что-то вводит в инпут поиска,то изменяем category на пустую строку,соответственно будет сразу идти поиск по всем товарам,а не в конкретной категории,но после поиска можно будет результат товаров по поиску уже отфильтровать по категориям и делаем повторный запрос на сервер уже с измененным значение searchValue(чтобы поиск число показвалось правильно,когда вводят что-то в поиск)
    useEffect(() => {
        setFilterCategories('');

        setFilterBrands({
            appleBrand: false,
            lgBrand: false,
            samsungBrand: false,
            xiaomiBrand: false
        });

        setFilterPrice('');

        refetchWithoutLimitAndChecks(); // делаем повторный запрос на сервер для обновления данных о количестве товаров определенных категорий и фильтров в зависимости от поиска(того,что пользователь введет в поиск)

    }, [searchValue])

    // при изменении фильтров изменяем состояние текущей страницы на первую
    useEffect(() => {
        setPage(1);
    }, [filterBrands, filterCategories, filterPrice,selectValue])

    // при изменении поиска и других фильтров делаем повторный запрос на сервер,чтобы переобновить данные для числа найденных товаров
    useEffect(()=>{

        refetchWithoutLimit(); // делаем запрос на сервер еще раз,чтобы переобновить данные для отображения числа найденных товаров

    },[searchValue,filterCategories,filterBrands,filterPrice]);

    // делаем запрос через useQuery еще раз,при изменении page(состояния текущей страницы),data?.data (массив товаров),изменении инпута поиска и других фильтров
    useEffect(() => {

        refetch(); // делаем запрос на сервер еще раз,чтобы переобновить данные

    }, [data?.data, page, searchValue, filterCategories,filterPrice,filterBrands,selectValue]);


    let pagesArray = getPagesArray(totalPages, page); // помещаем в переменную pagesArray массив страниц пагинации,указываем переменную pagesArray как let,так как она будет меняться в зависимости от проверок в функции getPagesArray

    return (
        <main id="mainCatalog" className={onScreen.sectionMainCatalogIntersecting ? "main mainCatalog mainCatalog__active" : "main mainCatalog"} ref={mainCatalogRef}>
            <section className="sectionCatalog">
                <div className="sectionCatalog__top">
                    <div className="container">
                        <div className="sectionCatalog__top-inner">
                            <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                            <p className="sectionCatalog__top-text">Home</p>
                            <img src="/images/header/CareRight.png" className="sectionCatalog__top-text sectionCatalog__top-textCenter"/>
                            <p className="sectionCatalog__top-textActive"> Catalog</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="sectionCatalog__inner">
                        <div className="sectionCatalog__filterBar">
                            <h1 className="filterBar__title">Category</h1>
                            <div className="filterBar__categories">
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Electronics Devices')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Electronics Devices' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Electronics Devices' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Electronic Devices</p>
                                    {/* если filterCategories === 'Electronics Devices' или включены какие-либо другие фильтры,то давать класс,который скрывает количество товаров этой категории,чтобы не прописывать кучу проверок на отображение всех фильтров,можно сделать запрос на сервер с url для каждой категории и фильтра,и потом с помощью проверок добавлять к этому url другие фильтры,чтобы отображалось корректно количество товаров в разных фильтрах,но сейчас этого не сделали */}
                                    <p className={filterCategories === 'Electronics Devices' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredElectronics?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Laptop')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Laptop' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Laptop' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Laptop</p>
                                    <p className={filterCategories === 'Laptop' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredLaptop?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Computer Accessories')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Computer Accessories' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Computer Accessories' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Computer Accessories</p>
                                    <p className={filterCategories === 'Computer Accessories' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredComputerAccessories?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('SmartPhone')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'SmartPhone' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'SmartPhone' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>SmartPhone</p>
                                    <p className={filterCategories === 'SmartPhone' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredSmartPhone?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Headphones')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Headphones' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Headphones' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Headphones</p>
                                    <p className={filterCategories === 'Headphones' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredHeadphones?.length})</p>
                                </label>
                            </div>
                            <div className="filterBar__price">
                                <h1 className="filterBar__title">Price</h1>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('Under $20')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === 'Under $20' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === 'Under $20' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Under $20</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredUnder20?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$20 to $100')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === '$20 to $100' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === '$20 to $100' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$20 to $100</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filtered20to100?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$100 to $500')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === '$100 to $500' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === '$100 to $500' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$100 to $500</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filtered100to500?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$500 to $1,000')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === '$500 to $1,000' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === '$500 to $1,000' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$500 to $1,000</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filtered500to1000?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('Above $1,000')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === 'Above $1,000' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === 'Above $1,000' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Above $1,000</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredAbove1000?.length})</p>
                                </label>
                            </div>
                            <div className="filterBar__price">
                                <h1 className="filterBar__title">POPULAR BRANDS</h1>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, appleBrand: !prev.appleBrand }))} />
                                    <span className={filterBrands.appleBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.appleBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"} >Apple</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredApple?.length})</p>
                                </label>
                                <label className="filterBar__categories-item"  >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, samsungBrand: !prev.samsungBrand }))} />
                                    <span className={filterBrands.samsungBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.samsungBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Samsung</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredSamsung?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, lgBrand: !prev.lgBrand }))} />
                                    <span className={filterBrands.lgBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.lgBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>LG</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredLg?.length})</p>
                                </label>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, xiaomiBrand: !prev.xiaomiBrand }))} />
                                    <span className={filterBrands.xiaomiBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.xiaomiBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Xiaomi</p>
                                    <p className={filterCategories !== '' || filterPrice !== '' || filterBrands.appleBrand !== false || filterBrands.samsungBrand !== false || filterBrands.xiaomiBrand !== false || filterBrands.lgBrand !== false ? "categories__item-amount categories__item-amountDisable" : "categories__item-amount"}>({filteredXiaomi?.length})</p>
                                </label>
                            </div>
                        </div>
                        <div className="sectionCatalog__productsBlock">
                            <div className="productsBlock__top">
                                <div className="productsBlock__top-inputBlock">
                                    <input type="text" className="productsBlock__top-input" placeholder="Search for anything..." value={searchValue} onChange={inputChangeHandler} />
                                    <img src="/images/sectionCatalog/glass.png" alt="" className="productsBlock__top-img" />
                                </div>
                                <div className="productsBlock__top-selectBlock">
                                    <p className="selectBlock__text">Sort by:</p>
                                    <div className="selectBlock__select-inner" onClick={() => setSelectActive((prev) => !prev)}>
                                        <div className="selectBlock__select" >
                                            <p className="select__text">{selectValue}</p>
                                            <img src="/images/sectionCatalog/arrowDown.png" alt="" className={selectActive ? "select__img select__img--active" : "select__img"} />
                                        </div>
                                        <div className={selectActive ? "select__optionsBlock select__optionsBlock--active" : "select__optionsBlock"}>
                                            <div className="optionsBlock__item" onClick={() => setSelectValue('Rating')}>
                                                <p className="optionsBlock__item-text">Rating</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="productsBlock__top-filters">
                                <div className="top__filters-left">
                                    <p className="filters__left-text">Active Filters:</p>

                                    {filterCategories !== '' &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">{filterCategories}</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setFilterCategories('')} />
                                        </div>
                                    }

                                    {filterPrice !== '' &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">{filterPrice}</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setFilterPrice('')} />
                                        </div>
                                    }

                                    {filterBrands.appleBrand &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">Apple</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setFilterBrands((prev) => ({ ...prev, appleBrand: false }))} />
                                        </div>
                                    }

                                    {filterBrands.samsungBrand &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">Samsung</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setFilterBrands((prev) => ({ ...prev, samsungBrand: false }))} />
                                        </div>
                                    }

                                    {filterBrands.lgBrand &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">LG</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setFilterBrands((prev) => ({ ...prev, lgBrand: false }))} />
                                        </div>
                                    }

                                    {filterBrands.xiaomiBrand &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">Xiaomi</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setFilterBrands((prev) => ({ ...prev, xiaomiBrand: false }))} />
                                        </div>
                                    }

                                    {selectValue &&
                                        <div className="filters__left-filterItem">
                                            <p className="filterItem__text">Sort By: </p>
                                            <p className="filterItem__text">{selectValue}</p>
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() => setSelectValue('')} />
                                        </div>
                                    }

                                </div>
                                <div className="top__filters-right">
                                    <p className="filters__right-text">{dataWithoutLimit?.data.length}</p>
                                    <p className="filters__right-desc">Results found.</p>
                                </div>
                            </div>

                            {error && <h3>{error.message}</h3>}

                            {/* если data?.data.length(длина массива товаров) true(то есть они есть),выводим товары в другом случае если !error true(то есть error = false,ошибки нет),то выводим Not found,в другом случае,если ошибка есть,выводим пустую строку(то есть текст not found не выводим) */}
                            <div className="sectionCatalog__productsBlock-products">
                                {data?.data.length ? data?.data.map(product =>
                                    <ProductItem key={product.id} product={product} />)
                                    : !error ?
                                        <h4>Not found</h4>
                                        : ''
                                }
                            </div>

                            {/* если длина массива объектов true(то есть товары есть),то показывать пагинацию,в другом случае пустая строка(то есть ничего не показывать) */}
                            {data?.data.length ?
                                <div className="sectionCatalog__productsBlock-pagination">
                                    <button className="pagination__btnArrow pagination__btnArrow-Left" onClick={prevPage}>
                                        <img src="/images/sectionCatalog/Arrow Button.png" alt="" className="btnLeft__imgLeft" />
                                    </button>

                                    {pagesArray.map(p =>
                                        <button
                                            key={p}

                                            className={page === p ? "pagination__item pagination__item--active" : "pagination__item"} //если состояние номера текущей страницы page равно значению элементу массива pagesArray,то отображаем такие классы,в другом случае другие

                                            onClick={() => setPage(p)} // отслеживаем на какую кнопку нажал пользователь и делаем ее активной,изменяем состояние текущей страницы page на значение элемента массива pagesArray(то есть страницу,на которую нажал пользователь)

                                        >
                                            {p}
                                        </button>
                                    )}

                                    {/* если общее количество страниц больше 4 и текущая страница меньше общего количества страниц - 2,то отображаем три точки */}
                                    {totalPages > 4 && page < totalPages - 2 && <div className="pagination__dots">...</div>}

                                    {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем кнопку последней страницы */}
                                    {totalPages > 3 && page < totalPages - 1 &&
                                        <button className="pagination__item" onClick={() => setPage(totalPages)}>{totalPages}</button>}

                                    <button className="pagination__btnArrow pagination__btnArrow-Right" onClick={nextPage}>
                                        <img src="/images/sectionCatalog/Arrow Button (1).png" alt="" className="btnLeft__imgRight" />
                                    </button>

                                </div>
                                : ''
                            }

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Catalog;