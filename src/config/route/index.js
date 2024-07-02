import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root from "../root/root";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Root />}>
        <Route path="/" element={<h1>ROTA OK</h1>}></Route>
        <Route path="/login" element={<h1>ROTA OK</h1>}></Route>
    </Route>
))