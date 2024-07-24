import { Button, Divider, Grid, useMediaQuery } from "@mui/material";
import ModalPedido from "../components/modal/modalPedido";
import InputPesquisa from "../components/filtros/inputPesquisa";
import { StatusCategory } from "../components/filtros/statusCategory";
import CardPedido from "../components/listagem/cardPedido";
import { useState, useRef } from "react";

export default function Pedidos() {
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState('');
    const [ticket, setTicket] = useState('');
    const [search, setSearch] = useState('');

    const isSmallFiltro = useMediaQuery('(max-width: 1199px)');
    const isSmallTop = useMediaQuery('(max-width: 899px)');

    const childRef = useRef()
    const childRefInput = useRef()

    const handleClearFilters = () => {
        setStatus('');
        setCategory('');
        setTicket('');
        setSearch('');
        childRef.current.clearFilters()
        childRefInput.current.clearInput()
    };

    return (
        <>
            <Grid container sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={12} md={5} lg={4}>
                    <ModalPedido setTicket={setTicket} />
                </Grid>
                {isSmallTop ? (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    <InputPesquisa setSearch={setSearch} ref={childRefInput}/>
                </Grid>
                {/* DIVISOR */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                </Grid>
                {/* DIVISOR */}
                <Grid item xs={12} sm={12} md={12} lg={3}>
                    <StatusCategory ref={childRef} setStatus={setStatus} setCategory={setCategory} />
                </Grid>
                {isSmallFiltro ? (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    {(status || category || ticket || search) && (
                        <Button sx={{ float: 'right', margin: '10px' }} onClick={handleClearFilters} variant="contained" color="error">
                            Limpar Filtros
                        </Button>
                    )}
                    <CardPedido status={status} category={category} ticketId={ticket} search={search} setTicket={setTicket}/>
                </Grid>
            </Grid>
        </>
    );
}
