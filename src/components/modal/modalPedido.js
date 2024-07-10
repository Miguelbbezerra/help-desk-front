import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalPedido() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" style={{ width: '100%', height: '100%' }}>Lançar Pedido</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
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
                        <Grid container spacing={2}>
                            <Grid item sx={12} sm={12} md={12} lg={12}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Lançar Novo Pedido
                                </Typography>
                            </Grid>
                            <Grid item sx={12} sm={12} md={12} lg={12}>
                                <Divider style={{ margin: '5px 0' }} />
                            </Grid>
                            <Grid item sx={12} sm={12} md={12} lg={12}>
                                <Typography id="transition-modal-description">
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
