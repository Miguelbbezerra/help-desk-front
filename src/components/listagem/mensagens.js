
import { useEffect, useState } from "react";
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

  useEffect(() => {
    socket.on('chat message', (msg) => {
      // Verificar se a mensagem pertence ao ticketId atual
      if (msg.ticketId === ticketId) {
        setMensagens((prevMensagens) => [...prevMensagens, msg]);
      }
    });

    return () => {
      socket.off('chat message');
    };
  }, [ticketId]); // Adicionar ticketId como dependência para atualizar o listener quando mudar de chat

  useEffect(() => {
    fetchMensagens(id);
  }, [id]);

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
    <>
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
      <Grid container>
        {!mensagens ? (
          <p>Erro ao carregar mensagens</p>
        ) : (
          mensagens.map((mensagem, index) => (
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}
              style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column',
                backgroundColor: '#222222', margin: '5px 0', borderRadius: '6px', padding: '10px', color: 'lightgray'
               }}
            /* style={mensagem?.ticket?.userId !== mensagem?.userId ? {} : { float: 'right' }} */
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <h4 style={{ margin: '0', color: '#fff' }}>{mensagem?.user?.fullName}</h4>
                <div>
                  <IconButton><EditIcon color="primary" sx={{ fontSize: 20 }} /></IconButton>
                  <IconButton onClick={() => handleDeleteMessage(mensagem.id)}><DeleteIcon color="error" sx={{ fontSize: 20 }} /></IconButton>
                </div>
              </div>
              <p style={{ wordWrap: 'break-word' }}>
                {mensagem.message}
              </p>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}
