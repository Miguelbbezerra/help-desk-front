import { useEffect, useState } from "react";
import '../../styles/pedidoChat.css'
import { Button, CardMedia, Divider, Grid } from "@mui/material";
import ModalEditTicket from "../modal/modalEditTicket";
import ModalDelete from "../modal/modalDelete";

export default function PedidoChat({ ticketId }) {

    const [ticket, setTicket] = useState(null);
    const [ticketHolder, setTicketHolder] = useState(ticketId)
    const [verificaTicket, setVerificaTicket] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedId, setSelectedId] = useState(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    useEffect(() => {
        async function fetchData(id) {
            try {
                const data = await fetchTicket(id);
                setTicket(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar o ticket:', error);
                setError(error.message);
                setLoading(false);
            }
        }
        if(verificaTicket === null){
            fetchData(ticketHolder);
        } else{
            window.location.href = '/pedidos';
        }

    }, [ticketHolder, verificaTicket]);

    async function fetchTicket(ticketId) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket/?active=1&id=${ticketId}`, requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar o ticket');
        }

        const data = await response.json();
        return data[0]; // Ajuste aqui para retornar o primeiro item do array
    }

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    if (!ticket) {
        return window.location.href = '/pedidos';
    }

    //MODAIS
    const handleEditOpen = (id) => {
        setSelectedId(id)
        setOpenEdit(true)
    }
    const handleEditClose = (id) => {
        setSelectedId(null)
        setOpenEdit(false)
    }
    ////////////
    const handleDeleteOpen = (id) => {
        setSelectedId(id)
        setOpenDelete(true)
    }
    const handleDeleteClose = (id) => {
        setSelectedId(null)
        setOpenDelete(false)
    }
    //MODAIS



    return (<>
        <Grid container sx={{ height: '90%' }}>
            <div className="container-ticket" style={{ position: 'fixed', height: '85%' }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h2>{ticket.user.fullName}</h2>
                    <p className="item">{ticket.user.level}</p>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <h3>{ticket.title}</h3>
                    <h3>{ticket.body}</h3>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <p style={{ whiteSpace: 'wrap' }} className={`${ticket.status.status}-selecionado`}>{ticket.status.status.replaceAll('-', ' ')}</p>
                    <p style={{ whiteSpace: 'wrap' }} className={`category-selecionado`}>{ticket.category.category.replaceAll('-', ' ')}</p>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CardMedia component='img' image="https://placehold.co/300x300" />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <p>Data de Criação: {new Date(ticket.createdAt).toLocaleString()}</p>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{ margin: '0 5px' }} fullWidth variant="outlined" color="warning" onClick={() => handleEditOpen(ticket.id)}>Editar</Button>
                    <Button sx={{ margin: '0 5px' }} fullWidth variant="outlined" color="error" onClick={() => handleDeleteOpen(ticket.id)}>Excluir</Button>
                </Grid>
                {selectedId !== null && (
                    <>
                        <ModalEditTicket open={openEdit} close={handleEditClose} ticketId={selectedId} setTicket={setTicketHolder} />
                        <ModalDelete open={openDelete} close={handleDeleteClose} table='ticket' id={selectedId} setTicket={setVerificaTicket} />
                    </>
                )}
            </div>
        </Grid >
    </>
    );
}
