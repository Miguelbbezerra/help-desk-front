import { Button, Divider, Grid, Menu, useMediaQuery } from "@mui/material";
import ModalPedido from "../components/modal/modalPedido";
import InputPesquisa from "../components/filtros/inputPesquisa";
import StatusCategory from "../components/filtros/statusCategory";
import CardPedido from "../components/listagem/cardPedido";
import { useState } from "react";

export default function Pedidos() {
    const [status, setStatus] = useState([]);
    const [category, setCategory] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isSmallFiltro = useMediaQuery('(max-width: 1199px)')
    const isSmallTop = useMediaQuery('(max-width: 899px)')

    return (
        <>
            <Grid container sx={{ display: "flex", justifyContent: 'space-between' }}>
                <Grid xs={12} sm={12} md={5} lg={4}>
                    <ModalPedido />
                </Grid>
                {isSmallTop ? (
                    <Grid xs={12} sm={12} md={12} lg={12}>
                        <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                    </Grid>
                ) : (
                    <></>
                )}
                <Grid xs={12} sm={12} md={6} lg={7}>
                    <InputPesquisa />
                </Grid>
                {/* DIVISOR */}
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: '#323232', height: '2px' }} />
                </Grid>
                {/* DIVISOR */}
                <Grid xs={12} sm={12} md={12} lg={3}>
                    {isSmallFiltro ? (
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
                                <StatusCategory setStatus={setStatus} setCategory={setCategory} />
                            </Menu>
                        </>
                    ) : (
                        <StatusCategory setStatus={setStatus} setCategory={setCategory} />
                    )}
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={9}>
                    <CardPedido status={status} category={category} />
                </Grid>
            </Grid>
        </>
    )
}