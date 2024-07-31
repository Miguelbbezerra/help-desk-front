import { useEffect, useState } from 'react';
import '../styles/home.css'
import { Divider, Grid } from "@mui/material";
import UseAuth from '../config/privateRoute/useAuth';


export default function Home() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user')
    const authData = UseAuth(token);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (user) {
            const userFormated = JSON.parse(user)
            setData(userFormated);
        } else {
            if (authData && authData.decoded.data) {
                const userData = authData.decoded.data
                localStorage.setItem('user', JSON.stringify(userData))
                setData(userData);
            }
        }
    }, [authData, user]);

    if (data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bloco">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        Seja Bem-Vindo, {data.fullName}!
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