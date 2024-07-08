import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../../styles/mensagens.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, createTheme, IconButton, TextField, ThemeProvider } from "@mui/material";

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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <h4 style={{ margin: '0' }}>{mensagem.user.fullName}</h4>
                                        <div>
                                            <IconButton><EditIcon color="primary" sx={{ fontSize: 20 }} /></IconButton>
                                            <IconButton><DeleteIcon color="error" sx={{ fontSize: 20 }} /></IconButton>
                                        </div>
                                    </div>
                                    {mensagem.message} {mensagem.message}{mensagem.message}{mensagem.message}{mensagem.message}{mensagem.message}
                                </div>
                            </div>
                        ) : (
                            <div className="div-mensagens">
                                <div className="mensagens" style={{ float: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <h4 style={{ margin: '0' }}>{mensagem.user.fullName}</h4>
                                        <div>
                                            <IconButton><EditIcon color="primary" sx={{ fontSize: 20 }} /></IconButton>
                                            <IconButton><DeleteIcon color="error" sx={{ fontSize: 20 }} /></IconButton>
                                        </div>
                                    </div>
                                    {mensagem.message}
                                </div>
                            </div>
                        )
                    ))
                )}
            </div>
            <div style={{margin: '10px 0'}}>
                <form style={{ display: 'flex'}}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            variant="outlined"
                            label="Enviar Mensagem"
                            sx={{
                                backgroundColor: '#222222',
                                width: '70%',
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
                        />
                    </ThemeProvider>
                    <Button variant="outlined" sx={{ width: '25%', height: '40px', margin: '0 10px' }}>Enviar</Button>
                </form>
            </div>
        </>
    )
}