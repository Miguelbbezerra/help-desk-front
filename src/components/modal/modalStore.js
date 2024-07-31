import { Backdrop, Box, Button, createTheme, Divider, Fade, Grid, Modal, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { getHeaders } from "../../config/headers/header";

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


const ModalStore = ({ open, close, setTable, table }) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const [data, setData] = useState("")

    function setInput(event) {
        const value = event.target.value
        setData(value)
    }

    const storeTable = async (table) => {
        try {
            var newData
            if (table === 'status') {
                newData = {
                    status: data
                };
            } else {
                newData = {
                    category: data
                };
            }
            var raw = JSON.stringify(newData);
            const requestOptions = {
                method: 'POST',
                headers: getHeaders(),
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`http://localhost:5000/${table}`, requestOptions);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro ao salvar ${table.toUpperCase()}`);
            }

            const result = await response.json();
            setTable(`id=${result.id}`)
            close()
        } catch (error) {
            setSnackbarMessage(error.message);
            console.error(`Erro ao salvar a ${table}`, error)
        }
    }


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={close}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form autoComplete='off'>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Adicionar novo(a) {table}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <ThemeProvider theme={theme}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <TextField type='text' variant='standard' label='Título'
                                            onChange={(event) => setInput(event)} value={data.status}
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>
                                </ThemeProvider>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button variant='outlined' type='button' color="primary" onClick={() => storeTable(table)}>Enviar</Button>
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
        </>
    )
}
export default ModalStore