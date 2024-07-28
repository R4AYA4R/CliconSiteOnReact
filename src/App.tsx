import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductItemPage from "./pages/ProductItemPage";
import AboutPage from "./pages/AboutPage";
import Cart from "./pages/Cart";



function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/catalog/:id' element={<ProductItemPage/>}/> {/* указываем после /catalog/ :id,для динамического id,чтобы потом открывалась отдельная страница товара по конкретному id  */}
          <Route path='/*' element={<Navigate to='/' />} /> {/* если пользователь введет в url несуществующую страницу,то его перекинет на главную */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
