import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/mensagens.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export function Mensagens() {
  const { id } = useParams();
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMensagens((prevMensagens) => [...prevMensagens, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {!mensagens ? (
          <p>Erro ao carregar mensagens</p>
        ) : (
          mensagens.map((mensagem, index) => (
            <div key={index} className="div-mensagens">
              <div className="mensagens" style={mensagem?.ticket?.userId !== mensagem?.userId ? {} : { float: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <h4 style={{ margin: '0' }}>{mensagem?.user?.fullName}</h4>
                  <div>
                    <IconButton><EditIcon color="primary" sx={{ fontSize: 20 }} /></IconButton>
                    <IconButton onClick={() => handleDeleteMessage(mensagem.id)}><DeleteIcon color="error" sx={{ fontSize: 20 }} /></IconButton>
                  </div>
                </div>
                {mensagem.message}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
