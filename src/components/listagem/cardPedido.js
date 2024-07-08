import { Link } from 'react-router-dom'
import '../../styles/cardPedido.css'
import { useEffect, useState } from 'react'

export default function CardPedido({ status, category }) {

    const [tickets, setTicket] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchTicket(status, category)
                setTicket(data)
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        }
        fetchData()
    }, [status, category]);

    async function fetchTicket(status, category) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket?${status}&${category}`, requestOptions)
        if (!response.ok) {
            throw new Error('Falha em listar as categorias');
        }

        const data = await response.json();
        return data;
    }

    return (
        <>
            {tickets.map((ticket, index) => (
                <div className='container'>
                    <div className='content'>
                        <div className='left'>
                            <h2>{ticket.title}</h2>
                            <p>{ticket.body}</p>
                        </div>
                        <div className='right'>
                            <div className='status-category'>
                                <div className={`status-${ticket.status.status}`}>{ticket.status.status}</div>
                                <div className='category-selecionado' style={{margin: '0 0 0 10px'}}>{ticket.category.category}</div>
                            </div>
                            <Link to={`/chat/${ticket.id}`} className='ver-mais'>Ver Mais</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
