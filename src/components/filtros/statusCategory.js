import { Button } from "@mui/material";
import '../../styles/statusCategory.css'
import { useEffect, useState } from "react";

export default function StatusCategory() {

    const [status, setStatus] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchStatus();
                setStatus(data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        }
        fetchData();

        // function fetchFiltro() {
        //     const urlParams = new URLSearchParams(window.location.search);
        //     const statusParam = urlParams.get('status'); // Verifica se há um parâmetro 'status' na URL

        //     if (statusParam) {
        //         return statusParam; // Retorna o valor do parâmetro 'status' se ele existir
        //     } else {
        //         return null; // Retorna null ou faz outra manipulação se 'status' não estiver presente
        //     }
        // }

        // const filtro = fetchFiltro();
        // setFiltro(filtro)
    }, []);

    const [filtro, setFiltro] = useState([]);

    async function fetchStatus() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("http://localhost:5000/category", requestOptions);
        if (!response.ok) {
            throw new Error('Falha em listar as categorias');
        }

        const data = await response.json();
        return data;
    }

    return (
        <>
            <div style={{ margin: '0 0 10px 0' }}>
                <div>
                    <h3 style={{ color: 'white', margin: 0 }}>Status</h3>
                </div>
                <div>
                    {status.map((statusItem, index) => (
                        // filtro === statusItem.category ? (
                        //     <a href={``}>
                        //         <button key={index} className={`status ${statusItem.category}-selecionado`}>
                        //             {statusItem.category}
                        //         </button>
                        //     </a>
                        // ) : (
                        //     <a href={`?status=${statusItem.category}`}>
                        //         <button key={index} className={`status ${statusItem.category}`}>
                        //             {statusItem.category}
                        //         </button>
                        //     </a>
                        // )

                        <button key={index} onClick={() => setFiltro(statusItem.category)} className={`status ${statusItem.category}`}>
                            {statusItem.category}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <h3 style={{ color: 'white', margin: 0 }}>Categoria</h3>
                </div>
                <div>
                    <Button variant="outlined" sx={{ margin: '3px 3px' }}>teste</Button>
                    <Button variant="contained" sx={{ margin: '3px 3px' }}>isso</Button>
                    <Button variant="outlined" sx={{ margin: '3px 3px' }}>aquele</Button>
                    <Button variant="outlined" sx={{ margin: '3px 3px' }}>amanha</Button>
                </div>
            </div>
        </>
    )
}