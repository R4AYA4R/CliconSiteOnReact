import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialUserState, IUser } from "../types/types";

// создаем переменную дефолтного состояния слайса и указываем ей поля,и указываем ему тип на основе нашего интерфейса IInitialUserState
const initialState:IInitialUserState={
    user: {} as IUser, // указываем поле user и даем ей значение объекта с типом как наш IUser 

    isAuth:false, // переменная для проверки,авторизован пользователь или нет

    isLoading:false // переменная для проверки загрузки
}

// создаем и экспортируем slice(то есть редьюсер)
export const userSlice = createSlice({
    name:'userSlice', // указываем название этого slice

    initialState, // указываем дефолтное состояние слайса(можно было написать initialState:initialState,но так как названия поля и значения совпадают,то можно записать просто initialState)

    // создаем здесь actions,которые потом смогут изменять состояние redux toolkit
    reducers:{

        // в параметре функции можно указать состояние(state) и action payload(данные,которые будем передавать этому action при вызове его в другом файле),указываем тип action payload(второму параметру этого action) PayloadAction и указываем в generic какой тип данных будем передавать потом при вызове этого action(в данном случае IUser)
        setUser:(state,action:PayloadAction<IUser>)=>{
            state.user = action.payload; // изменяем поле user у состояния(state) на action.payload(то есть в данном случае на объект типа IUser)
        },

        setAuth:(state,action:PayloadAction<boolean>)=>{
            state.isAuth = action.payload; // изменяем поле isAuth у состояния(state) на action.payload(то есть в данном случае на переменную типа boolean,котору мы потом укажем)
        },

        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.isLoading = action.payload; // изменяем поле isLoading у состояния(state) на action.payload(то есть в данном случае на переменную типа boolean,котору мы потом укажем)
        }


    }

})