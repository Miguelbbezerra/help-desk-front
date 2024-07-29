import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root from "../root/root";
import Home from "../../pages/home";
import Pedidos from "../../pages/pedidos";
import Chat from "../../pages/chat";
import Configuracoes from "../../pages/configuracoes";
import Usuarios from "../../pages/usuarios";
import Status from "../../pages/status";
import Categorias from "../../pages/categorias";
import SignInSide from "../../pages/login";

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<SignInSide />}></Route>
        <Route element={<Root />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/pedidos" element={<Pedidos />}></Route>
            <Route path="/chat/:id" element={<Chat />}></Route>
            <Route path="/configuracoes" element={<Configuracoes />}></Route>
            <Route path="/configuracoes/usuarios" element={<Usuarios />}></Route>
            <Route path="/configuracoes/status" element={<Status />}></Route>
            <Route path="/configuracoes/categorias" element={<Categorias />}></Route>

        </Route>
    </>
))