
export interface IProduct{
    id:number,
    category:string,
    brand:string,
    image:any, // был string
    name:string,
    price:number,
    priceFilter:string,
    amount:number,
    rating:number,
    totalPrice:number
}

// создаем и экспортируем тип для товара корзины
export interface IProductBasket{
    id:number,
    usualProductId:number,
    category:string,
    brand:string,
    image:any, // был string
    name:string,
    price:number,
    priceFilter:string,
    amount:number,
    rating:number,
    totalPrice:number,
    forUser:string

}

export interface IInitialPagesState{
    totalPages:number
}


// создаем и экспортируем интерфейс для объекта пользователя,который приходит от сервера
export interface IUser{
    email:string,
    isActivated:boolean,
    id:string,
    userName:string,
    roles:string[]// указываем полю roles тип на основе нашего интерфейса Role и что это массив(то есть это массив,который будет содержать элементы типа Role)
}

// создаем и экспортируем интерфейс для объекта состояния редьюсера для пользователя,указываем ему поле user на основе нашего интерфейса IUser,и остальные поля
export interface IInitialUserState{
    user:IUser, 
    isAuth:boolean,
    isLoading:boolean,
}

export interface IPayloadPages{
    totalCount:number,
    limit:number
}

export interface IComment{
    id:number,
    nameFor:string,
    name:string,
    text:string,
    rating:number
}

// создаем и экспортируем наш интерфейс для AuthResponse
export interface AuthResponse{
    // указываем здесь поля этого интерфейса для объекта
    accessToken:string;
    refreshToken:string;
    user:IUser; // указываем в поле user объект(с теми полями, которые описаны в IUser) на основе нашего интерфеса IUser
}

// создаем и экспортируем наш интерфейс IRegistrationLogin для типа объекта,который будем указываем функции registration и login в userSlice
export interface IRegistrationLogin{
    email:string,
    password:string
}