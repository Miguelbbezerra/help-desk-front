
import { Grid, useMediaQuery } from "@mui/material";
import PedidoChat from "../components/listagem/pedidoChat";
import { Mensagens } from "../components/listagem/mensagens";
import { useParams } from "react-router-dom";
import InputMensagem from "../components/input/inputMensagem";
import io from 'socket.io-client';
import { useEffect, useState } from "react";

const socket = io('http://localhost:5000');

export default function Chat() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);
  const ticketId = id; // Substitua pelo valor real
  const userId = 3; // Substitua pelo valor real

  useEffect(() => {
    socket.on('chat message', (msg) => {
      // Verificar se a mensagem pertence ao ticketId atual
      if (msg.ticketId === ticketId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    return () => {
      socket.off('chat message');
    };
  }, [ticketId]); // Adicionar ticketId como dependência para atualizar o listener quando mudar de chat

  const handleSendMessage = (msg) => {
    socket.emit('chat message', msg);
    // Adicionar manualmente a mensagem enviada ao estado (opcional)
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const somePedido = useMediaQuery('(max-width: 899px')

  return (
    <>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <Mensagens messages={messages} ticketId={ticketId} userId={userId} />
          <InputMensagem onSendMessage={handleSendMessage} userId={userId} ticketId={ticketId} />
        </Grid>
        {!somePedido ? (
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <PedidoChat ticketId={id} />
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
