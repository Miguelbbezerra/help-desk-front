import { Grid } from "@mui/material"
import PedidoChat from "../components/listagem/pedidoChat"
import { Mensagens } from "../components/listagem/mensagens"
import { useParams } from "react-router-dom";
import InputMensagem from "../components/input/inputMensagem";
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io('http://localhost:5000');

export default function Chat() {
    const { id } = useParams();

    const [messages, setMessages] = useState([]);
    const ticketId = id; // Passando o ID do ticket diretamente do useParams
    const userId = 1; // Substitua pelo valor real do ID do usuário

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleSendMessage = (message) => {

        socket.emit('chat message', message);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    <Mensagens messages={messages} key={ticketId} /> {/* Adicionando key para renderização correta */}
                    <InputMensagem onSendMessage={handleSendMessage}/>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <PedidoChat ticketId={id} />
                </Grid>
            </Grid>
        </>
    )
}
