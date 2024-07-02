import { Button, Grid } from "@mui/material";
import '../styles/home.css'

export default function Home() {
    return (
        <div className="bloco">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Grid item xs={6} sm={6} md={6} lg={6} >
                        <Button className="button" variant="contained">Teste</Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} >

                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}