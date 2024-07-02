import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<h1>ROTA OK</h1>}></Route>
        <Route path="/login" element={<h1>ROTA OK</h1>}></Route>
    </Route>
))