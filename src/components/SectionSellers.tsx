import { useRef } from "react";
import { useIsOnScreen } from "../hooks/useIsOnScreen";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import SectionSellersItem from "./SectionSellersItem";

const SectionSellers = ()=>{
    const sectionSellersRef = useRef(null);
    const onScreen = useIsOnScreen(sectionSellersRef);

    // const {data} = useQuery({
    //     queryKey:['getProductsForSellers'],
    //     queryFn:async ()=>{
    //         const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts');

    //         return response;
    //     }
    // })

    const {data:dataApple} = useQuery({
        queryKey:['getProductsApple'],
        queryFn:async () => {
            // делаем запрос на сервер для получения товаров у которых brand равен Apple и лимит указываем 2(то есть придет максимум 2 продукта от сервера)
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts?brand=Apple',{
                params:{
                    
                    _limit:2

                }
            })

            return response;
        }
    })

    const {data:dataSamsung} = useQuery({
        queryKey:['getProductsSamsung'],
        queryFn:async () => {
             // делаем запрос на сервер для получения товаров у которых brand равен Samsung и лимит указываем 2(то есть придет максимум 2 продукта от сервера)
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts?brand=Samsung',{
                params:{
                    
                    _limit:2

                }
            })
            
            return response;
        }
    })

    const {data:dataLg} = useQuery({
        queryKey:['getProductsLg'],
        queryFn:async () => {
             // делаем запрос на сервер для получения товаров у которых brand равен Lg и лимит указываем 2(то есть придет максимум 2 продукта от сервера)
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts?brand=LG',{
                params:{
                    
                    _limit:2

                }
            })
            
            return response;
        }
    })

    const {data:dataXiaomi} = useQuery({
        queryKey:['getProductsXiaomi'],
        queryFn:async () => {
             // делаем запрос на сервер для получения товаров у которых brand равен Xiaomi и лимит указываем 2(то есть придет максимум 2 продукта от сервера)
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts?brand=Xiaomi',{
                params:{
                    
                    _limit:2

                }
            })
            
            return response;
        }
    })



    // const appleProducts = data?.data.filter(product => product.brand === 'Apple');

    // const samsungProducts = data?.data.filter(product => product.brand === 'Samsung');

    // const xiaomiProductsPriceFiltered = data?.data.filter(product => product.priceFilter === '$500 to $1,000');

    // const lgProducts = data?.data.filter(product => product.brand === 'LG');

    return(
        <section className="sectionSellers">
            <div className="container">
                <div id="sectionSellers" ref={sectionSellersRef} className={onScreen.sectionSellersIntersecting ? "sectionSellers__inner sectionSellers__inner-active" : "sectionSellers__inner"}>
                    <div className="sectionSellers__flash">
                        <h1 className="sectionSellers__flash-title">FLASH SALE TODAY</h1>

                        {dataApple?.data?.map(product => 
                            <SectionSellersItem key={product.id} product={product}/>
                        )}

                    </div>
                    <div className="sectionSellers__seller">
                        <h1 className="sectionSellers__flash-title">BEST SELLERS</h1>

                        {dataSamsung?.data?.map(product => 
                            <SectionSellersItem key={product.id} product={product}/>
                        )}

                    </div>
                    <div className="sectionSellers__rated">
                        <h1 className="sectionSellers__flash-title">TOP RATED</h1>
                        
                        {dataLg?.data?.map(product => 
                            <SectionSellersItem key={product.id} product={product}/>
                        )}

                    </div>
                    <div className="sectionSellers__new">
                        <h1 className="sectionSellers__flash-title">NEW ARRIVAL</h1>
                        
                        {dataXiaomi?.data?.map(product => 
                            <SectionSellersItem key={product.id} product={product}/>
                        )}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionSellers;