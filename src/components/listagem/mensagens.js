import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/mensagens.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from "@mui/material";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export function Mensagens({ messages, ticketId, userId }) {
  const { id } = useParams();
  const [mensagens, setMensagens] = useState([]);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      if (msg.ticketId === ticketId) {
        setMensagens((prevMensagens) => [...prevMensagens, msg]);
        setHighlightedMessageId(msg.id);

        // setTimeout(() => {
        //   setHighlightedMessageId(null);
        // }, 3000);
      }
    });

    return () => {
      socket.off('chat message');
    };
  }, [ticketId]);

  useEffect(() => {
    fetchMensagens(id);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchMensagens = async (id) => {
    try {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch(`http://localhost:5000/chat/?ticketId=${id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Falha em listar as mensagens');
      }

      const data = await response.json();
      setMensagens(data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    // Lógica para deletar a mensagem (implemente conforme necessário)
  };

  return (
    <Grid container style={{ width: '100%' }}>
      {!mensagens ? (
        <p>Erro ao carregar mensagens</p>
      ) : (
        <>
          {mensagens.map((mensagem, index) => (
            <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: parseInt(mensagem.userId) === 1 ? 'flex-end' : 'flex-start' }}>
              <div style={{ width: '50%' }}>
                <Grid item xs={12} className={highlightedMessageId === mensagem.id ? 'highlight' : ''} style={{
                  display: 'flex', flexDirection: 'column', backgroundColor: '#222222', margin: '5px', borderRadius: '6px', padding: '10px', color: 'lightgray',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: '0', color: '#fff' }}>{mensagem?.userId}</h4>
                    <div>
                      <IconButton><EditIcon color="primary" sx={{ fontSize: 20 }} /></IconButton>
                      <IconButton onClick={() => handleDeleteMessage(mensagem.id)}><DeleteIcon color="error" sx={{ fontSize: 20 }} /></IconButton>
                    </div>
                  </div>
                  <p style={{ wordWrap: 'break-word' }}>
                    {mensagem.message}
                  </p>
                </Grid>
                <p style={{ color: 'gray', margin: 0 }}>{new Date(mensagem.createdAt).toLocaleString()}</p>
              </div>
            </Grid>
          ))}
          <div ref={messageEndRef} />
        </>
      )}
    </Grid>
  );
}
