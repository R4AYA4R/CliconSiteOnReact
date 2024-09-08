import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductItemPage from "./pages/ProductItemPage";
import AboutPage from "./pages/AboutPage";
import Cart from "./pages/Cart";
import ScrollToTop from "./utils/ScrollToTop";
import { createContext, useState } from "react";
import FormPage from "./components/FormComponent";
import UserPage from "./pages/UserPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/catalog/:id' element={<ProductItemPage />} /> {/* указываем после /catalog/ :id,для динамического id,чтобы потом открывалась отдельная страница товара по конкретному id  */}
            <Route path='/*' element={<Navigate to='/' />} /> {/* если пользователь введет в url несуществующую страницу,то его перекинет на главную */}
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
