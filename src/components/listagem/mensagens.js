import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/mensagens.css';
import { Grid } from "@mui/material";
import io from 'socket.io-client';
import { getHeaders } from "../../config/headers/header";

const socket = io('http://localhost:5000');

export function Mensagens({ ticketId }) {
  const { id } = useParams();
  const [mensagens, setMensagens] = useState([]);
  const [highlightedMessageId, setHighlightedMessageId] = useState(null);
  const messageEndRef = useRef(null);
  const userId = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    socket.on('chat message', (msg) => {
      if (msg.ticketId === ticketId) {
        setMensagens((prevMensagens) => [...prevMensagens, msg]);
        setHighlightedMessageId(msg.id);
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
        headers: getHeaders(),
        method: 'GET',
        redirect: 'follow'
      };

      const response = await fetch(`http://localhost:5000/chat/?active=1&ticketId=${id}`, requestOptions);
      if (!response.ok) {
        throw new Error('Falha em listar as mensagens');
      }

      const data = await response.json();
      setMensagens(data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  return (
    <Grid container style={{ width: '100%' }}>
      {!mensagens ? (
        <p>Erro ao carregar mensagens</p>
      ) : (
        <>
          {mensagens.map((mensagem, index) => (
            <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: parseInt(mensagem.userId) === userId.id ? 'flex-end' : 'flex-start' }}>
              <div style={{ width: '50%' }}>
                <Grid item xs={12} className={highlightedMessageId === mensagem.id ? 'highlight' : ''} style={{
                  display: 'flex', flexDirection: 'column', backgroundColor: '#222222', margin: '5px', borderRadius: '6px', padding: '10px', color: 'lightgray',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: '0', color: '#fff' }}>{mensagem.user.fullName}</h4>
                    {/* <div>
                      <IconButton><EditIcon color="primary" sx={{ fontSize: 20 }} /></IconButton>
                      <IconButton ><DeleteIcon color="error" sx={{ fontSize: 20 }} /></IconButton>
                    </div> */}
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
