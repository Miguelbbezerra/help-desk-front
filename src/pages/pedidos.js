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

    // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

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
                <Grid xs={12} sm={12} md={5} lg={4}>
                    <ModalPedido setTicket={setTicket} />
                </Grid>
                {isSmallTop ? (
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid xs={12} sm={12} md={6} lg={7}>
                    <InputPesquisa setSearch={setSearch} ref={childRefInput}/>
                </Grid>
                {/* DIVISOR */}
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                </Grid>
                {/* DIVISOR */}
                <Grid xs={12} sm={12} md={12} lg={3}>
                    {/* {isSmallFiltro ? (
                        <>
                            <Button
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Filtros
                            </Button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                sx={{ // Adicionei sx para estilizar o Menu
                                    '& .MuiPaper-root': {
                                        backgroundColor: '#161616',
                                        width: '100%' // Mesma cor do fundo da div interna
                                    }
                                }}
                            >
                                <StatusCategory ref={childRef} setStatus={setStatus} setCategory={setCategory} />
                            </Menu>

                        </>
                    ) : (
                        <StatusCategory ref={childRef} setStatus={setStatus} setCategory={setCategory} />
                    )} */}
                    <StatusCategory ref={childRef} setStatus={setStatus} setCategory={setCategory} />
                </Grid>
                {isSmallFiltro ? (
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid xs={12} sm={12} md={12} lg={9}>
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
