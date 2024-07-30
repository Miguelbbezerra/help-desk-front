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
import PrivateRoute from "../privateRoute/privateRoute";

export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<SignInSide />}></Route>
        <Route element={<Root />}>
            <Route path="/home" element={<PrivateRoute element={<Home />} />}></Route>
            <Route path="/pedidos" element={<PrivateRoute element={<Pedidos />} />}></Route>
            <Route path="/chat/:id" element={<PrivateRoute element={<Chat />} />}></Route>
            <Route path="/configuracoes" element={<PrivateRoute element={<Configuracoes />} />}></Route>
            <Route path="/configuracoes/usuarios" element={<PrivateRoute element={<Usuarios />} />}></Route>
            <Route path="/configuracoes/status" element={<PrivateRoute element={<Status />} />}></Route>
            <Route path="/configuracoes/categorias" element={<PrivateRoute element={<Categorias />} />}></Route>
        </Route>
    </>
))