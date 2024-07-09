import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button, TextField, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976D2',
          },
          color: 'white',
          paddingRight: '8px',
        },
        input: {
          padding: '8px 14px',
          color: 'white',
          fontSize: '14px',
          height: 'auto',
        },
        notchedOutline: {
          borderColor: 'white',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#1976D2',
          },
          '&:hover': {
            color: '#1976D2',
          },
          color: 'white',
        },
      },
    },
  },
});

const InputMensagem = ({ onSendMessage, userId, ticketId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msg = {
        message: message,
        ticketId: ticketId,
        userId: userId
      };
      onSendMessage(msg); // Envia a mensagem com os IDs necessários
      setMessage('');
    }
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            variant="outlined"
            label="Enviar Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              backgroundColor: '#222222',
              width: '70%',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                minHeight: '40px',
              },
              '& .MuiInputLabel-root': {
                top: '-5px',
              },
            }}
          />
        </ThemeProvider>
        <Button variant="outlined" sx={{ width: '25%', height: '40px', margin: '0 10px' }} type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default InputMensagem;
