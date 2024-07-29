import { Button, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useEffect, useState } from "react";
import ModalDelete from "../components/modal/modalDelete";
import { format, parseISO } from "date-fns";
import ModalStoreUser from "../components/modal/modalStoreUser";
import ModalEditUser from "../components/modal/modalEditUser";

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openStore, setOpenStore] = useState(false)

    const [filtro, setFiltro] = useState('')

    const fetchUsuarios = useCallback(async () => {
        try {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const response = await fetch(`http://localhost:5000/user?active=1&${filtro}`, requestOptions);
            if (!response.ok) {
                throw new Error('Falha em listar os usuários');
            }

            const data = response.json()
            return data
        } catch (error) {
            console.error("Erro ao listar os usuários", error)
        }
    }, [filtro])

    const fetchData = useCallback(async () => {
        try {
            const usuarios = await fetchUsuarios()
            setUsuarios(usuarios)
        } catch (error) {
            console.error("Erro ao executar o fetchData", error)
        }
    }, [setUsuarios, fetchUsuarios])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleOpenEdit = (id) => {
        setSelectedId(id)
        setOpenEdit(true)
    }
    const handleOpenDelete = (id) => {
        setSelectedId(id)
        setOpenDelete(true)
    }

    const handleCloseEdit = (id) => {
        setSelectedId(null)
        setOpenEdit(false)
    }
    const handleCloseDelete = (id) => {
        setSelectedId(null)
        setOpenDelete(false)
    }

    const handleCloseStore = () => {
        setOpenStore(false)
    }
    const handleOpenStore = () => {
        setOpenStore(true)
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Link to='/configuracoes'><Button variant='outlined'>Voltar</Button></Link>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant='outlined' onClick={() => handleOpenStore()}>Novo Usuário</Button>
                    <ModalStoreUser open={openStore} close={handleCloseStore} setTable={setFiltro} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Divider sx={{ margin: '10px 0', backgroundColor: '#222222' }} />
                </Grid>
                {filtro && (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button onClick={() => setFiltro('')} variant='outlined' color="error" sx={{ marginBottom: '10px' }}>Limpar Filtro</Button>
                    </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer component={Paper} sx={{ backgroundColor: '#222222' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#111111' }}>
                                    <TableCell sx={{ borderBottom: '1px solid black', color: '#fff' }}>Nome</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid black', color: '#fff' }}>Email</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid black', color: '#fff' }}>Telefone</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid black', color: '#fff' }}>Data de Nascimento</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid black', color: '#fff' }}>Endereço</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid black', color: '#fff' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usuarios.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{ borderBottom: '1px solid black', color: '#cccccc', textTransform: 'uppercase' }} component="th" scope="row" >
                                            {item.fullName}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid black', color: '#cccccc' }} >{item.email}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid black', color: '#cccccc' }} >{item.phone}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid black', color: '#cccccc' }} >{format(parseISO(item.dateBirth), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid black', color: '#cccccc' }} >{item.adress}</TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid black', color: '#cccccc' }} >
                                            <IconButton color="warning" onClick={() => handleOpenEdit(item.id)}><EditIcon /></IconButton>
                                            <IconButton color="error" onClick={() => handleOpenDelete(item.id)}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {selectedId !== null && (
                        <>
                            <ModalDelete open={openDelete} close={handleCloseDelete} table="user" id={selectedId} setTicket={fetchData} />
                            <ModalEditUser open={openEdit} close={handleCloseEdit} id={selectedId} setTable={fetchData} />
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default Usuarios