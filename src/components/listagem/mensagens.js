import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../../styles/mensagens.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

export function Mensagens() {

    const { id } = useParams()

    const [mensagens, setMensagens] = useState()

    useEffect(() => {
        async function fetchData(id) {
            try {
                const data = await fetchMensagens(id)
                setMensagens(data)
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        }
        fetchData(id)
    }, [id])

    async function fetchMensagens(id) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/chat/?ticketId=${id}`, requestOptions)
        if (!response.ok) {
            throw new Error('Falha em listar as categorias');
        }

        const data = await response.json()
        return data
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {!mensagens ? (
                    <p>erro</p>
                ) : (
                    mensagens.map((mensagem) => (
                        mensagem.ticket.userId !== mensagem.userId ? (
                            <div className="div-mensagens">
                                <div className="mensagens">
                                    <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
                                        <h4 style={{ margin: '0' }}>Nome</h4>
                                        <div>
                                            <IconButton><EditIcon color="primary" sx={{fontSize: 20}}/></IconButton>
                                            <IconButton><DeleteIcon color="error" sx={{fontSize: 20}}/></IconButton>
                                        </div>
                                    </div>
                                    {mensagem.message}</div>
                            </div>
                        ) : (
                            <div className="div-mensagens">
                                <div className="mensagens" style={{ float: 'right' }}>{mensagem.message}</div>
                            </div>
                        )
                    ))
                )}
            </div>
        </>
    )
}