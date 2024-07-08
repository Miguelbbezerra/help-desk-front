import { useEffect, useState } from "react";
import '../../styles/pedidoChat.css'
import { CardMedia, Divider } from "@mui/material";

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

    return (
        <div className="container-ticket">
            <h2>{ticket.user.fullName}</h2>
            <p className="item">{ticket.user.level}</p>
            <Divider sx={{ margin: '5px 0', backgroundColor: 'black' }} />
            <h3>{ticket.title}</h3>
            <h3>{ticket.body}</h3>
            <p className={`${ticket.status.status}-selecionado`}>{ticket.status.status}</p>
            <p className={`category-selecionado`}>{ticket.category.category}</p>
            <Divider sx={{ margin: '5px 0', backgroundColor: 'black' }} />
            <CardMedia component='img' image="https://placehold.co/300x300"/>
            <Divider sx={{ margin: '5px 0', backgroundColor: 'black' }} />
            <p>Data de Criação: {new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
    );
}
