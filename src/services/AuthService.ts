import { AxiosResponse } from "axios";
import { AuthResponse } from "../types/types";
import $api from "../http/http";

export default class AuthService{
    // создаем функцию у этого класса для логина,принимает эта функция в параметрах email пользователя и пароль,указываем им тип string,указываем тип,который возвращает эта функция(в данном случае Promise,так как она асинхронная,и у Promise в generic указываем AxiosResponse(тип данных,который возвращает axios) и внутри AxiosResponse указываем еще наш тип AuthResponse(тип данных,уже конкретная data, которая приходит от сервера)),указываем тип этой функции static,чтобы можно было вызывать эту функцию без создания экземпляра этого класса(то есть не делая объект на основе этого класса,а просто указывая этот класс и через точку эту функцию)
    static async login(email:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        
        return $api.post<AuthResponse>('/login',{email,password}); // используем наш instance axios(наш axios с определенными настройками для работы) и указываем здесь post(post запрос),первым параметром указываем адрес эндпоинта (/login),вторым параметром указываем тело запроса,указываем тип данных,который возвращает этот post запрос(AuthResponse в данном случае)

    }

    static async registration(email:string,password:string):Promise<AxiosResponse<AuthResponse>>{

        return $api.post<AuthResponse>('/registration',{email,password}); // используем наш instance axios(наш axios с определенными настройками для работы) и указываем здесь post(post запрос),первым параметром указываем адрес эндпоинта (/registration),вторым параметром указываем тело запроса,указываем тип данных,который возвращает этот post запрос(AuthResponse в данном случае)

    }

    // функция для запроса на выход из аккаунта,указываем тип возвращаемых данных Promise<void>(что промис ничего не возвращает)
    static async logout():Promise<void>{
        return $api.post('/logout'); // используем наш instance axios(наш axios с определенными настройками для работы) и указываем здесь post(post запрос) на эндпоинт /logout для выхода из аккаунта
    }

    // static async auth():Promise<void>{

    //     return $api.get('/auth'); // возвращаем get запрос с помощью нашего axios($api) на эндпоинт /users,указываем тип возвращаемых данных этого запроса(IUser[] в данном случае,массив пользователей)

    // }


}