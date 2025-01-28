import {BrowserRouter,  Route, Routes } from "react-router-dom";
import  Preguntas from "../pages/preguntas/Preguntas";
import Respuesta from "../pages/preguntas/components/Respuesta";
import Home from "../pages/home/Home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/preguntas" element={<Preguntas />} />
                <Route path="/respuesta" element={<Respuesta/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;