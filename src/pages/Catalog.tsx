import { useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import ProductItem from "../components/ProductsItem";

const Catalog = () => {

    const [filterCategories, setFilterCategories] = useState('');

    const [filterPrice, setFilterPrice] = useState('');

    const [selectActive, setSelectActive] = useState(false);

    const [selectValue,setSelectValue] = useState('');

    const [filterBrands, setFilterBrands] = useState({
        appleBrand: false,
        samsungBrand: false,
        lgBrand: false,
        xiaomiBrand: false,
    })

    const mainCatalogRef = useRef(null);

    const onScreen = useIsOnScreen(mainCatalogRef);


    return (
        <main id="mainCatalog" className={onScreen.sectionMainCatalogIntersecting ? "main mainCatalog mainCatalog__active" : "main mainCatalog"} ref={mainCatalogRef}>
            <section className="sectionCatalog">
                <div className="sectionCatalog__top">
                    <div className="container">
                        <div className="sectionCatalog__top-inner">
                            <img src="/images/sectionCatalog/House.png" alt="" className="sectionCatalog__top-img" />
                            <p className="sectionCatalog__top-text">Home</p>
                            <p className="sectionCatalog__top-text sectionCatalog__top-textCenter">{'>'}</p>
                            <p className="sectionCatalog__top-text"> Catalog</p>
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
                                    <p className={filterCategories === 'Electronics Devices' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Electronics Devices</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Computer & Laptop')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Computer & Laptop' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Computer & Laptop' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Computer & Laptop</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Computer Accessories')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Computer Accessories' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Computer Accessories' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Computer Accessories</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('SmartPhone')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'SmartPhone' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'SmartPhone' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>SmartPhone</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Headphones')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className={filterCategories === 'Headphones' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterCategories === 'Headphones' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Headphones</p>
                                </label>
                            </div>
                            <div className="filterBar__price">
                                <h1 className="filterBar__title">Price</h1>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('Under $20')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === 'Under $20' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === 'Under $20' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Under $20</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$20 to $100')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === '$20 to $100' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === '$20 to $100' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$20 to $100</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$100 to $500')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === '$100 to $500' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === '$100 to $500' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$100 to $500</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$500 to $1,000')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === '$500 to $1,000' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === '$500 to $1,000' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$500 to $1,000</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('Above $1,000')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className={filterPrice === 'Above $1,000' ? "categories__item-radioStyle categories__item-radioStyleActive" : "categories__item-radioStyle"}></span>
                                    <p className={filterPrice === 'Above $1,000' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Above $1,000</p>
                                </label>
                            </div>
                            <div className="filterBar__price">
                                <h1 className="filterBar__title">POPULAR BRANDS</h1>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, appleBrand: !prev.appleBrand }))} />
                                    <span className={filterBrands.appleBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.appleBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"} >Apple</p>
                                </label>
                                <label className="filterBar__categories-item"  >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, samsungBrand: !prev.samsungBrand }))} />
                                    <span className={filterBrands.samsungBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.samsungBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Samsung</p>
                                </label>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, lgBrand: !prev.lgBrand }))} />
                                    <span className={filterBrands.lgBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.lgBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>LG</p>
                                </label>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({ ...prev, xiaomiBrand: !prev.xiaomiBrand }))} />
                                    <span className={filterBrands.xiaomiBrand ? "categories__item-checkBoxStyle categories__item-checkBoxStyleActive" : "categories__item-checkBoxStyle"}></span>
                                    <p className={filterBrands.xiaomiBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Xiaomi</p>
                                </label>
                            </div>
                        </div>
                        <div className="sectionCatalog__productsBlock">
                            <div className="productsBlock__top">
                                <div className="productsBlock__top-inputBlock">
                                    <input type="text" className="productsBlock__top-input" placeholder="Search for anything..." />
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
                                            <div className="optionsBlock__item" onClick={()=>setSelectValue('Rating')}>
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
                                            <img src="/images/sectionCatalog/cross.png" alt="" className="filterItem-img" onClick={() =>setSelectValue('')} />
                                        </div>
                                    }

                                </div>
                                <div className="top__filters-right">
                                    <p className="filters__right-text">10</p>
                                    <p className="filters__right-desc">Results found.</p>
                                </div>
                            </div>
                            <div className="sectionCatalog__productsBlock-products">
                                    <ProductItem/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Catalog;