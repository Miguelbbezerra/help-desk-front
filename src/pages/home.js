import "chartjs-plugin-datalabels";
import '../styles/home.css'
import { Divider, Grid } from "@mui/material";


export default function Home() {
   
    return (
        <div className="bloco">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        Seja Bem-Vindo, (NOME COMPLETO DO USER)!
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        <Divider style={{ backgroundColor: '#fff', margin: '5px 0' }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        {/* <Bar type="bar" ref={ref} data={data} options={options} /> */}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}