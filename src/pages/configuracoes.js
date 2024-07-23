import { Divider, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import GroupIcon from '@mui/icons-material/Group';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

import "../styles/config.css"

const Configuracoes = () => {

    const items = [
        { title: 'Usuários', icon: <GroupIcon sx={{ fontSize: '50px', margin: '5px', color: '#1976D2' }} />, desc: 'Visualizar, adicionar e atualizar usuários.', path: '/configuracoes/usuarios' },
        { title: 'Status', icon: <InfoRoundedIcon sx={{ fontSize: '50px', margin: '5px', color: '#1976D2' }} />, desc: 'Visualizar, adicionar e atualizar status.', path: '/configuracoes/status' },
        { title: 'Categorias', icon: <CategoryRoundedIcon sx={{ fontSize: '50px', margin: '5px', color: '#1976D2' }} />, desc: 'Visualizar, adicionar e atualizar categorias.', path: '/configuracoes/categorias' },
    ]


    return (
        <>
            <Grid container>
                {items.map((item, index) => (
                    <Grid key={index} sx={{ padding: '10px' }} item xs={12} sm={12} md={6} lg={4} >
                        <Link to={item.path} className="link">
                            {item.icon}
                            <Divider orientation="vertical" sx={{ margin: '5px 15px 5px 0', backgroundColor: '#222222' }} flexItem />
                            <div className="block">
                                <p className="title">{item.title}</p>
                                <p className="desc">{item.desc}</p>
                            </div>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Configuracoes