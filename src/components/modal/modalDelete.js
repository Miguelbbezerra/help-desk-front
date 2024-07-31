import { Backdrop, Box, Button, Divider, Fade, Grid, Modal, Typography } from "@mui/material"
import { getHeaders } from "../../config/headers/header";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    border: '2px solid #d32f2f',
    boxShadow: 24,
    p: 4,
    backgroundColor: '#222222',
    color: '#fff'
};

const ModalDelete = ({ open, close, table, id, setTicket }) => {

    function deleteItem(table, id) {
        var raw = JSON.stringify({
            active: 0
        });

        var requestOptions = {
            method: 'PUT',
            headers: getHeaders(),
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/${table}/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setTicket(' ')
                close()
            })
            .catch(error => console.log('error', error));
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
                                        Tem certeza que deseja deletar?
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button variant='outlined' type='button' color="error" onClick={() => deleteItem(table, id)}>Deletar</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
export default ModalDelete