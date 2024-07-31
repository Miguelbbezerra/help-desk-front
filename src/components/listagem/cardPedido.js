import { Link } from 'react-router-dom';
import '../../styles/cardPedido.css';
import { useEffect, useState } from 'react';
import ModalEditTicket from '../modal/modalEditTicket';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelete from '../modal/modalDelete';
import { getHeaders } from '../../config/headers/header';

export default function CardPedido({ status, category, ticketId, search, setTicket }) {
    const [tickets, setTickets] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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
            headers: getHeaders(),
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket/?${status}&${category}&${ticketId}&${search}&active=1`, requestOptions);
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

    const handleOpenDelete = (id) => {
        setSelectedId(id);
        setOpenDelete(true);
    }
    const handleCloseDelete = () => {
        setSelectedId(null);
        setOpenDelete(false);
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: '10px' }}>
                                    <Link to={`/chat/${ticket.id}?userId=${ticket.userId}`}><IconButton type='button' color='primary'><VisibilityIcon sx={{ margin: '0' }} /></IconButton></Link>
                                    <IconButton type='button' color='warning' onClick={() => handleOpen(ticket.id)}><EditIcon /></IconButton>
                                    <IconButton type='button' color='error' onClick={() => handleOpenDelete(ticket.id)}><DeleteIcon /></IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {selectedId !== null && (
                <>
                    <ModalEditTicket open={openEdit} close={handleClose} ticketId={selectedId} setTicket={setTicket} />
                    <ModalDelete open={openDelete} close={handleCloseDelete} table='ticket' id={selectedId} setTicket={setTicket}/>
                </>
            )}
        </>
    );
}
