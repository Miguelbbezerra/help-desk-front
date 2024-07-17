import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const socket = io('http://localhost:5000')

const Notificacao = () => {

    const { userId } = useParams()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [notifications, setNotification] = useState([])

    useEffect(() => {
        socket.on('notification', (notification) => {
            console.log('Received Notification', notification)
            setNotification((prevNotification) => [...prevNotification, notification])
        })

        return () => {
            socket.off('notification')
        }
    }, [])

    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: '#fff' }}
            >
                <NotificationsIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ width: 'auto' }}
            >
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        notification.data.userId !== userId && (
                            <span style={{
                                position: 'absolute',
                                top: 5,
                                left: 5,
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: ' 2px 5px',
                                width: '10px',
                                height: '10px',
                            }}></span>
                        )
                            (notification.data.userId !== userId ? (
                                <Link to={`/chat/${notification.data.ticketId}?userId=2`}>
                                    <MenuItem sx={{ width: '100%' }} key={index}>

                                        {notification.type === 'new_chat_message' && `New chat message: ${notification.data.message}`}
                                        {notification.type === 'new_ticket' && `New ticket: ${notification.data.title}`}
                                        {notification.type === 'update_ticket' && `Updated ticket: ${notification.data.title}`}
                                    </MenuItem>
                                </Link>
                            ) : (
                                <MenuItem >Nenhuma Notificação</MenuItem>
                            ))

                    ))
                ) : (
                    <MenuItem >Nenhuma Notificação</MenuItem>
                )}

            </Menu>


        </>
    )
}
export default Notificacao