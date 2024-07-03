import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root from "../root/root";
import Home from "../../pages/home";
import Pedidos from "../../pages/pedidos";

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<h1 style={{ color: '#CCD0CF' }}>ROTA OK</h1>}></Route>
        <Route element={<Root />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/pedidos" element={<Pedidos />}></Route>
        </Route>
    </>
))