
export interface IProduct{
    id:number,
    category:string,
    brand:string,
    image:string,
    name:string,
    price:number,
    priceFilter:string,
    amount:number,
    rating:number,
    totalPrice:number
}

export interface IInitialPagesState{
    totalPages:number
}

export interface IPayloadPages{
    totalCount:number,
    limit:number
}