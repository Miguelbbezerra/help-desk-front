import { Backdrop, Box, Button, createTheme, Divider, Fade, Grid, Modal, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material"
import { useState } from "react"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#222222',
    color: '#fff'
};

const theme = createTheme({
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:hover:not(.Mui-disabled):before': {
                        borderColor: '#f2f2f2', // Cor da borda ao passar o mouse
                    },
                    '&.Mui-focused:before': {
                        borderColor: '#1976D2', // Cor da borda ao focar
                    },
                    color: '#f2f2f2', // Cor do texto digitado
                },
                input: {
                    color: '#f2f2f2', // Cor do texto digitado
                },
                underline: {
                    '&:before': {
                        borderColor: '#f2f2f2', // Cor da borda padrão
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderColor: '#f2f2f2', // Cor da borda ao passar o mouse
                    },
                    '&.Mui-focused:after': {
                        borderColor: '#1976D2', // Cor da borda ao focar
                    },
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
                    color: '#f2f2f2',
                },
            },
        },
    },
});

const ModalStoreUser = ({ open, close, setTable }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const [data, setData] = useState({
        email: "",
        phone: "",
        dateBirth: "",
        password: "",
        fullName: "",
        adress: "",
        level: "comum"
    });

    function setInput(event, key) {
        const value = event?.target ? event.target.value : event; // Handle both text and date fields
        setData({ ...data, [key]: value });
    }

    const storeTable = async () => {
        try {
            // Formatar a data para o padrão YYYY-MM-DD
            if (data.dateBirth) {
                const date = new Date(data.dateBirth);
                const formattedDate = date.toISOString().split('T')[0]; // Pega a data no formato YYYY-MM-DD
                data.dateBirth = formattedDate; // Atualiza o campo dateBirth no objeto data
            }

            // Preparar os cabeçalhos e o corpo da solicitação
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify(data); // Converte o objeto data atualizado para JSON

            // Enviar a solicitação POST
            const response = await fetch(`http://localhost:5000/user`, {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            });

            // Verificar se a resposta foi bem-sucedida
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro ao salvar usuário`);
            }

            // Processar a resposta JSON
            const result = await response.json();
            setData({
                email: "",
                phone: "",
                dateBirth: "",
                password: "",
                fullName: "",
                adress: "",
                level: "comum"
            })
            setTable(`id=${result.id}`);
            close();
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarOpen(true);
            console.error(`Erro ao salvar o usuário`, error);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form autoComplete='off'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Editar Usuário
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label='Nome Completo'
                                        onChange={(event) => setInput(event, 'fullName')} value={data.fullName}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label='Email'
                                        onChange={(event) => setInput(event, 'email')} value={data.email}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label='Telefone'
                                        onChange={(event) => setInput(event, 'phone')} value={data.phone}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Data de Nascimento" type="date" variant="standard"
                                        fullWidth value={data.dateBirth} onChange={(event) => setInput(event, 'dateBirth')} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label='Endereço'
                                        onChange={(event) => setInput(event, 'adress')} value={data.adress}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label='Senha'
                                        onChange={(event) => setInput(event, 'password')} value={data.password}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant='outlined' color="primary" onClick={() => storeTable()}>
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </ThemeProvider>
    );
};

export default ModalStoreUser;
