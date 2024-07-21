import { useEffect, useRef, useState } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";

const Catalog = () => {

    const [filterCategories, setFilterCategories] = useState('');

    const [filterPrice, setFilterPrice] = useState('');

    // const [brandApple, setBrandApple] = useState(false);

    // const [brandSamsung, setBrandSamsung] = useState(false);

    // const [brandLg, setBrandLg] = useState(false);

    // const [brandXiaomi, setBrandXiaomi] = useState(false);

    const [filterBrands,setFilterBrands] = useState({
        appleBrand:false,
        samsungBrand:false,
        lgBrand:false,
        xiaomiBrand:false,
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
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterCategories === 'Electronics Devices' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Electronics Devices</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Computer & Laptop')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterCategories === 'Computer & Laptop' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Computer & Laptop</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Computer Accessories')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterCategories === 'Computer Accessories' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Computer Accessories</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('SmartPhone')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterCategories === 'SmartPhone' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>SmartPhone</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterCategories('Headphones')}>
                                    <input name="radio" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterCategories === 'Headphones' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Headphones</p>
                                </label>
                            </div>
                            <div className="filterBar__price">
                                <h1 className="filterBar__title">Price</h1>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('All Price')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterPrice === 'All Price' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>All Price</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('Under $20')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterPrice === 'Under $20' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Under $20</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$20 to $100')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterPrice === '$20 to $100' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$20 to $100</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$100 to $500')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterPrice === '$100 to $500' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$100 to $500</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('$500 to $1,000')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterPrice === '$500 to $1,000' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>$500 to $1,000</p>
                                </label>
                                <label className="filterBar__categories-item" onClick={() => setFilterPrice('Above $1,000')}>
                                    <input name="rd__price" type="radio" className="categories__item-radio" />
                                    <span className="categories__item-radioStyle"></span>
                                    <p className={filterPrice === 'Above $1,000' ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Above $1,000</p>
                                </label>
                            </div>
                            <div className="filterBar__price">
                                <h1 className="filterBar__title">POPULAR BRANDS</h1>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({...prev,appleBrand:!prev.appleBrand}))} />
                                    <span className="categories__item-checkBoxStyle"></span>
                                    <p className={filterBrands.appleBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"} >Apple</p>
                                </label>
                                <label className="filterBar__categories-item"  >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({...prev,samsungBrand:!prev.samsungBrand}))} />
                                    <span className="categories__item-checkBoxStyle"></span>
                                    <p className={filterBrands.samsungBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Samsung</p>
                                </label>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({...prev,lgBrand:!prev.lgBrand}))}/>
                                    <span className="categories__item-checkBoxStyle"></span>
                                    <p className={filterBrands.lgBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>LG</p>
                                </label>
                                <label className="filterBar__categories-item" >
                                    <input type="checkbox" className="categories__item-radio" onClick={() => setFilterBrands((prev) => ({...prev,xiaomiBrand:!prev.xiaomiBrand}))} />
                                    <span className="categories__item-checkBoxStyle"></span>
                                    <p className={filterBrands.xiaomiBrand ? "categories__item-text categories__item-textActive" : "categories__item-text"}>Xiaomi</p>
                                </label>
                            </div>
                        </div>
                        <div className="sectionCatalog__productsBlock">
                            products
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Catalog;