import { Backdrop, Box, Button, createTheme, Divider, Fade, Grid, Modal, Snackbar, TextField, ThemeProvider, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    border: '2px solid #ed6c02',
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


const ModalEdit = ({ id, open, close, setTable, table }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const [data, setData] = useState("")

    const fetchTable = useCallback(async (id, table) => {
        try {
            const response = await fetch(`http://localhost:5000/${table}?id=${id}`, {
                method: 'GET',
                redirect: 'follow'
            })
            const data = await response.json()
            return data
        } catch (error) {
            setSnackbarMessage(error.message);
            console.error("Erro ao buscar a table", error)
        }
    }, [])

    const fetchData = useCallback(async () => {
        try {
            const result = await fetchTable(id, table)
            setData(result[0])

        } catch (error) {
            setSnackbarMessage(error.message);
            console.error("Erro ao realizar o FetchData", error)
        }
    }, [fetchTable, id, table])

    useEffect(() => {
        if (open) {
            fetchData()
        }
    }, [open, fetchData])

    function setInput(event) {
        const value = event.target.value
        setData(value)
    }

    const storeTable = async (table, id) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
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
            const response = await fetch(`http://localhost:5000/${table}/${id}`, {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            })
            console.log(response)
            setTable()
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
                                        Editar {table}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <ThemeProvider theme={theme}>
                                    {data.status ? (
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type='text' variant='standard' label='Título'
                                                onChange={(event) => setInput(event)} value={data.status}
                                                sx={{ width: '100%' }}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <TextField type='text' variant='standard' label='Título'
                                                onChange={(event) => setInput(event)} value={data.category}
                                                sx={{ width: '100%' }}
                                            />
                                        </Grid>
                                    )}

                                </ThemeProvider>

                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button variant='outlined' type='button' color="warning" onClick={() => storeTable(table, id)}>Enviar</Button>
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
export default ModalEdit