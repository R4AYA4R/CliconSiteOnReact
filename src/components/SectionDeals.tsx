import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionDealsItem from "./SectionDealsItem";
import { IProduct } from "../types/types";
import { Link } from "react-router-dom";

const SectionDeals = () => {
    const sectionDealsRef = useRef(null);
    const onScreen = useIsOnScreen(sectionDealsRef);

    const {data} = useQuery({
        queryKey:['getAllProducts'],
        queryFn:async ()=>{
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts',{
                params:{
                    _limit:8
                }
            });

            return response;
        }
    })

    return (
        <section id="sectionDeals" ref={sectionDealsRef} className={onScreen.sectionDealsIntersecting ? "sectionDeals sectionDeals__active" : "sectionDeals"}>
            <div className="container">
                <div className="sectionDeals__inner">
                    <div className="sectionDeals__top">
                        <h1 className="sectionDeals__title">Best Deals</h1>
                        <Link to="/catalog" className="sectionDeals__top-browseBlock">
                            <p className="top__browseBlock-text">Browse All Product</p>
                            <img src="/images/sectionDeals/ArrowRightBlue.png" alt="" className="top__browseBlock__img" />
                        </Link>
                    </div>
                    <div className="sectionDeals__deals">

                        {data?.data.map(product => 
                            <SectionDealsItem product={product} key={product.id}/>
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionDeals;