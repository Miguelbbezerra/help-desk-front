import { Link } from 'react-router-dom';
import '../../styles/cardPedido.css';
import { useEffect, useState } from 'react';

export default function CardPedido({ status, category, ticketId }) {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchTicket(status, category, ticketId);
                setTickets(data);
            } catch (error) {
                console.error('Erro ao buscar tickets:', error);
            }
        }
        fetchData();
    }, [status, category, ticketId]);

    async function fetchTicket(status, category, ticketId) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket?${status}&${category}&${ticketId}`, requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os tickets');
        }

        const data = await response.json();
        return data;
    }

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
                                <Link to={`/chat/${ticket.id}?userId=${ticket.userId}`} className='ver-mais'>Ver Mais</Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
