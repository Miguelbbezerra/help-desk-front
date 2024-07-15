import { Link } from 'react-router-dom';
import '../../styles/cardPedido.css';
import { useEffect, useState } from 'react';
import ModalEditTicket from '../modal/modalEditTicket';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function CardPedido({ status, category, ticketId, search }) {
    const [tickets, setTickets] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchTicket(status, category, ticketId, search);
                setTickets(data);
            } catch (error) {
                console.error('Erro ao buscar tickets:', error);
            }
        }
        fetchData();
    }, [status, category, ticketId, search]);

    async function fetchTicket(status, category, ticketId, search) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket?${status}&${category}&${ticketId}&${search}`, requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os tickets');
        }

        const data = await response.json();
        return data;
    }

    // modais
    const handleOpen = (id) => {
        setSelectedId(id);
        setOpenEdit(true);
    }
    const handleClose = () => {
        setSelectedId(null);
        setOpenEdit(false);
    }
    // modais

    return (
        <>
            {Array.isArray(tickets) && tickets.length === 0 ? (
                <div className='container'>
                    <div className='content'>
                        Nenhum Registro Encontrado
                    </div>
                </div>
            ) : (
                tickets.map((ticket, index) => (
                    <div key={index} className='container'>
                        <div className='content'>
                            <div className='left'>
                                <h2>{ticket.title}</h2>
                                <p>{ticket.body}</p>
                            </div>
                            <div className='right'>
                                <div className='status-category'>
                                    <div style={{ fontSize: 12 }} className={`status-${ticket.status.status}`}>{ticket.status.status.replaceAll('-', ' ')}</div>
                                    <div className='category-selecionado' style={{ margin: '0 0 0 10px', cursor: 'default', fontSize: 12 }}>{ticket.category.category.replaceAll('-', ' ')}</div>
                                </div>
                                <IconButton type='button' color='primary' onClick={() => handleOpen(ticket.id)}><EditIcon /></IconButton>
                                <Link to={`/chat/${ticket.id}?userId=${ticket.userId}`} className='ver-mais'>Ver Mais</Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {selectedId !== null && (
                <ModalEditTicket open={openEdit} close={handleClose} ticketId={selectedId}/>
            )}
        </>
    );
}
