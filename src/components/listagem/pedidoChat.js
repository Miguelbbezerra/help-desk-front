import { useEffect, useState } from "react";
import '../../styles/pedidoChat.css'
import { Button, CardMedia, Divider, Grid } from "@mui/material";

export default function PedidoChat({ ticketId }) {

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(ticketId) {
            try {
                const data = await fetchTicket(ticketId);
                setTicket(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar o ticket:', error);
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData(ticketId);
    }, [ticketId]);

    async function fetchTicket(ticketId) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket/?id=${ticketId}`, requestOptions);
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
        return <p>Nenhum ticket encontrado.</p>;
    }


    return (<>
        <Grid container  sx={{ height: '90%' }}>
            <div className="container-ticket" style={{ position: 'fixed', height: '85%' }}>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <h2>{ticket.user.fullName}</h2>
                    <p className="item">{ticket.user.level}</p>
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <h3>{ticket.title}</h3>
                    <h3>{ticket.body}</h3>
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <p style={{ whiteSpace: 'wrap' }} className={`${ticket.status.status}-selecionado`}>{ticket.status.status.replaceAll('-', ' ')}</p>
                    <p style={{ whiteSpace: 'wrap' }} className={`category-selecionado`}>{ticket.category.category.replaceAll('-', ' ')}</p>
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <CardMedia component='img' image="https://placehold.co/300x300" />
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <p>Data de Criação: {new Date(ticket.createdAt).toLocaleString()}</p>
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: 'black' }} />
                </Grid>
                <Grid item sx={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{ width: '45%', border: '1px solid #1976D2' }}>Editar</Button>
                    <Button sx={{ width: '45%', border: '1px solid #F44336', color: '#F44336' }}>Excluir</Button>
                </Grid>
            </div>
        </Grid >
    </>
    );
}
