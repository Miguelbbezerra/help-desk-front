import React from 'react';
import { TextField, InputAdornment, IconButton, ThemeProvider, createTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Cor da borda ao passar o mouse
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1976D2', // Cor da borda ao focar
                    },
                    color: 'white', // Cor do texto digitado
                    paddingRight: '8px', // Ajuste do padding para o botão
                },
                input: {
                    padding: '8px 14px', // Ajuste do padding para centralizar texto verticalmente
                    color: 'white', // Cor do texto digitado
                    fontSize: '14px', // Ajuste do tamanho da fonte
                    height: 'auto', // Ajuste da altura para centralizar texto
                },
                notchedOutline: {
                    borderColor: 'white', // Cor da borda padrão
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#1976D2', // Cor da label ao focar
                    },
                    '&:hover': {
                        color: '#1976D2', // Cor da label ao passar o mouse
                    },
                    color: 'white',
                },
            },
        },
    },
});

export default function InputPesquisa() {
    return (
        <ThemeProvider theme={theme}>
            <TextField
                variant="outlined"
                label="Pesquisar Pedido"
                sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                        color: 'white', // Cor do texto digitado
                    },
                    '& .MuiOutlinedInput-root': {
                        minHeight: '40px', // Altura mínima do input
                    },
                    '& .MuiInputLabel-root': {
                        top: '-5px', // Ajuste para alinhar a label
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <SearchIcon style={{ color: 'white' }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </ThemeProvider>
    );
}
