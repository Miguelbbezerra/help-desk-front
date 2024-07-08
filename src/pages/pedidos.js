import { Divider, Grid } from "@mui/material";
import ModalPedido from "../components/modal/modalPedido";
import InputPesquisa from "../components/filtros/inputPesquisa";
import StatusCategory from "../components/filtros/statusCategory";
import CardPedido from "../components/listagem/cardPedido";
import { useState } from "react";

export default function Pedidos() {
    const [status, setStatus] = useState([]);
    const [category, setCategory] = useState([]);
    return (
        <>
            <Grid container sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Grid xs={12} sm={12} md={5} lg={4}>
                    <ModalPedido />
                </Grid>
                <Grid xs={12} sm={12} md={6} lg={7}>
                    <InputPesquisa />
                </Grid>
                {/* DIVISOR */}
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                </Grid>
                {/* DIVISOR */}
                <Grid xs={12} sm={12} md={12} lg={3}>
                    <StatusCategory setStatus={setStatus} setCategory={setCategory} />
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={9}>
                    <CardPedido status={status} category={category} />
                </Grid>
            </Grid>
        </>
    )
}