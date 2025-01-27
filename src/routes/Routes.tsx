import {BrowserRouter,  Route, Routes } from "react-router-dom";
import  Preguntas from "../pages/preguntas/Preguntas";
import Home from "../pages/home/Home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/preguntas" element={<Preguntas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;