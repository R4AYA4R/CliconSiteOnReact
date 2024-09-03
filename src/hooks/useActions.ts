import { useDispatch } from "react-redux";
import { totalPagesSlice } from "../store/totalPagesSlice";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { userSlice } from "../store/userSlice";

const rootActions={
    ...totalPagesSlice.actions, // разворачиваем все actions из нашего слайса в этот объект
    ...userSlice.actions // разворачиваем все actions из нашего слайса userSlice в этот объект
}

// создаем и экспортируем хук useActions,чтобы потом просто вызвав этот хук в другом файле,получить доступ к actions,уже не указывая еще раз отдельно диспатч и не передавая в него action(это делается тут уже в этот хук),просто для удобства
export const useActions=()=>{
    const dispatch = useDispatch(); // указываем диспатч

    // возвращаем хук useMemo,чтобы данные кешировались и изменялись только при изменении dispatch(указываем его в квадартных скобках),bindActionCreators-фукция,которая позволяет обернуть все actions в диспатч,чтобы было удобнее потом использовать диспатч
    return useMemo(()=>bindActionCreators(rootActions,dispatch),[dispatch]);

}