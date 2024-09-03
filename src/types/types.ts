
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

// создаем и экспортируем интерфейс для объекта пользователя,который приходит от сервера
export interface IUser{
    email:string,
    isActivated:boolean,
    id:string
}

// создаем и экспортируем интерфейс для объекта состояния редьюсера для пользователя,указываем ему поле user на основе нашего интерфейса IUser,и остальные поля
export interface IInitialUserState{
    user:IUser, 
    isAuth:boolean,
    isLoading:boolean
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