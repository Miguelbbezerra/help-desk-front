import { Backdrop, Box, Button, createTheme, Divider, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
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

export default function ModalEditTicket({ ticketId, open, close }) {
    const [status, setStatusData] = useState([]);
    const [categories, setCategoriesData] = useState([]);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        categoryId: '',
        status: '',
        userId: 2
    });

    function setInput(event, key) {
        const value = event.target.value;
        const newFormData = Object.assign({}, formData, { [key]: value });
        setFormData(newFormData);
    }

    useEffect(() => {
        if (open) {
            async function fetchData() {
                try {
                    const ticketData = await fetchTicket(ticketId);
                    const statusData = await fetchStatus();
                    const categoriesData = await fetchCategory();

                    setStatusData(statusData);
                    setCategoriesData(categoriesData);

                    const newFormData = {
                        title: ticketData[0].title,
                        body: ticketData[0].body,
                        categoryId: ticketData[0].categoryId,
                        status: ticketData[0].status.id,
                        userId: 2
                    };

                    setFormData(newFormData);
                } catch (error) {
                    console.error('Erro ao listar category/status: ', error);
                }
            }
            fetchData();
        }
    }, [open, ticketId]);


    async function fetchTicket(id) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`http://localhost:5000/ticket?id=${id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os tickets');
        }

        const data = await response.json();
        return data;
    }

    async function fetchStatus() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/status", requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os status');
        }

        const data = await response.json();
        return data;
    }

    async function fetchCategory() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/category", requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar os category');
        }

        const data = await response.json();
        return data;
    }

    function storeTicket(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(formData);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/ticket/${id}`, requestOptions)
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao salvar PEDIDO');
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                // setTicket(`id=${result.id}`);
                close(); // Ensure modal closes after saving
            })
            .catch((error) => {
                console.error(error);
                setSnackbarMessage(error.message);
                setSnackbarOpen(true);
            });
    }


    return (
        <div>
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
                                <Grid item sx={12} sm={12} md={12} lg={12}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Editar Pedido
                                    </Typography>
                                </Grid>
                                <Grid item sx={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <ThemeProvider theme={theme}>
                                    <Grid item sx={12} sm={12} md={6} lg={6}>
                                        <TextField type='text' variant='standard' label='Título'
                                            onChange={(event) => setInput(event, 'title')} value={formData.title}
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid item sx={12} sm={12} md={6} lg={6}>
                                        <TextField type='text' variant='standard' label='Descrição'
                                            onChange={(event) => setInput(event, 'body')} value={formData.body}
                                            sx={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid item sx={12} sm={12} md={6} lg={6}>
                                        <FormControl variant="standard" sx={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-standard-label">Categoria</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                label="Categoria"
                                                onChange={(event) => setInput(event, 'categoryId')} value={formData.categoryId}
                                                style={{ textTransform: 'uppercase' }}
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category.id} value={category.id} style={{ textTransform: 'uppercase' }}>{category.category.replaceAll('-', ' ')}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sx={12} sm={12} md={6} lg={6}>
                                        <FormControl variant="standard" sx={{ width: '100%' }}>
                                            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                label="Status"
                                                onChange={(event) => setInput(event, 'status')} value={formData.status}
                                                style={{ textTransform: 'uppercase' }}
                                            >
                                                {status.map((statusItem) => (
                                                    <MenuItem key={statusItem.id} value={statusItem.id} style={{ textTransform: 'uppercase' }}>{statusItem.status.replaceAll('-', ' ')}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </ThemeProvider>

                                <Grid item sx={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <Grid item sx={12} sm={12} md={12} lg={12}>
                                    <Button variant='outlined' type='button' onClick={storeTicket(ticketId)}>Enviar</Button>
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
        </div>
    );
}
