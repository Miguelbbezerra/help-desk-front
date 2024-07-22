import { Grid, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import CircleIcon from '@mui/icons-material/Circle';

const styles = {
    link: {
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'row',
        textDecoration: 'none',
        color: 'white'
    },
    icon: {
        fontSize: '80px'
    },
    title: {

    },
    desc: {

    },
    block: {
        height: '100%'
    }
}

const Configuracoes = () => {
    return (
        <>
            <Grid container>
                <Grid sx={{ padding: '10px' }} item xs={12} sm={12} md={6} lg={4} >
                    <Link style={styles.link}>
                        <IconButton color="primary"><CircleIcon sx={styles.icon}/></IconButton>
                        <div style={styles.block}>
                            <p style={styles.title}>Teste</p>
                            <p style={styles.desc}>Esse é um teste</p>
                        </div>
                    </Link>
                </Grid>
            </Grid>
        </>
    )
}

export default Configuracoes