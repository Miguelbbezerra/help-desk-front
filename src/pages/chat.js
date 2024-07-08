import { Grid } from "@mui/material"
import PedidoChat from "../components/listagem/pedidoChat"
import { Mensagens } from "../components/listagem/mensagens"
import { useParams } from "react-router-dom";

export default function Chat() {
    const { id } = useParams();
    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={9}>
                    <Mensagens />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                    <PedidoChat ticketId={id} />
                </Grid>
            </Grid>
        </>
    )
}