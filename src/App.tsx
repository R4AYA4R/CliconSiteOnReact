import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";



function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/catalog' element={<Catalog/>}/>
          <Route path='/*' element={<Navigate to='/' />} /> {/* если пользователь введет в url несуществующую страницу,то его перекинет на главную */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
