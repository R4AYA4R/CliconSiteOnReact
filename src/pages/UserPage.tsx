import { useTypedSelector } from "../hooks/useTypedSelector";

const UserPage = () => {

    const {user} = useTypedSelector(state => state.userSlice);  // указываем наш слайс(редьюсер) под названием userSlice и деструктуризируем у него поле состояния user,используя наш типизированный хук для useSelector

    return(
        <main className="main">
            userPage for {user.email}
        </main>
    )
}

export default UserPage;