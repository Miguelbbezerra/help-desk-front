import { Button, Divider, Grid } from "@mui/material"
import { Link } from "react-router-dom"

const Usuarios = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link to='/configuracoes'><Button variant='outlined'>Voltar</Button></Link>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: '#222222' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    teste rota
                </Grid>
            </Grid>
        </>
    )
}

export default Usuarios