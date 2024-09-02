import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { totalPagesSlice } from "./totalPagesSlice";
import { apiBasket } from "./apiBasket";
import { userSlice } from "./userSlice";

// если несколько редьюсеров на сайте,то можно их объединить с помощью combineReducers и передать потом в store
const reducers = combineReducers({

    totalPagesReducer: totalPagesSlice.reducer, // даем название редьюсеру и указываем этот слайс totalPagesSlice(редьюсер),указываем через точку редьюсер из нашего слайса,так как не эспортировали его отдельно,но и так можно

    [apiBasket.reducerPath]: apiBasket.reducer, // указываем наш api для rtk query,указываем его reducerPath(название) и его редьюсер

    userSlice:userSlice.reducer, // указываем еще один слайс(редьюсер) для авторизации пользователя

})

// создаем и экспортируем store
export const store = configureStore({

    reducer: reducers, // указываем в reducer наш редьюсер(в данном случае мы объединили редьюсеры с помощью combineReducers и поместили в переменную reducers,их и указываем)

    //указываем мидлвэир для нашего rtk query,добавляем в массив дефолтного мидлвэира мидлвэир от нашего api(rtk query),мидлвэир-прослойка(функция),которая появляется в определенном этапе и выполняет какие-то действия,например,делает проверку на какое-то условие и тд,добавляем в скобках в concat через запятую второй мидлвеир для второго нашего api
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiBasket.middleware)

})

export type RootState = ReturnType<typeof store.getState> // экспортируем тип,который берем у нашего состояния в store с помощью getState