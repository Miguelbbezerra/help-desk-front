import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useParams, useLocation } from "react-router-dom";

const socket = io('http://localhost:5000');

const Notificacao = () => {
    const { id } = useParams(); // Extração do id da URL, que será usado como ticketId
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const userIdFromQuery = queryParams.get('userId'); // Extração do userId dos query parameters

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            console.log("userId " + userIdFromQuery);
            const response = await fetch('http://localhost:5000/notification?viewed=0');
            const data = await response.json();

            // Filtra as notificações para incluir apenas aquelas cujo userId é diferente do userId atual
            const filteredNotifications = data.filter(notification => notification.data.userId !== userIdFromQuery);

            console.log(filteredNotifications); // Mostra as notificações filtradas no console

            setNotifications(filteredNotifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Fetch notifications from the API
    useEffect(() => {
        fetchNotifications();
    }, [userIdFromQuery]); // Adiciona userIdFromQuery como dependência do useEffect

    // Handle real-time notifications via socket.io
    useEffect(() => {
        socket.on('notification', (notification) => {
            console.log('Received Notification', notification);
            if (notification.data.userId !== userIdFromQuery) {
                setNotifications((prevNotifications) => [...prevNotifications, notification]);
            }
        });

        return () => {
            socket.off('notification');
        };
    }, [userIdFromQuery]);

    // Check if there is a ticketId (id) in the URL and mark the corresponding notification as viewed
    useEffect(() => {
        const markNotificationAsViewed = async (ticketId) => {
            try {
                const matchingNotifications = notifications.filter(notification => notification.data.ticketId === ticketId);

                if (matchingNotifications.length > 0) {
                    await Promise.all(matchingNotifications.map(async (notification) => {
                        await fetch(`http://localhost:5000/notification/${notification.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ viewed: 1 })
                        });
                    }));
                    fetchNotifications(); // Atualiza a lista de notificações
                }
            } catch (error) {
                console.error('Error marking notification as viewed:', error);
            }
        };

        if (id) {
            markNotificationAsViewed(id);
        }
    }, [id, notifications]);

    return (
        <>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{ color: '#fff', position: 'relative' }}
            >
                {notifications.length > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: 5,
                        left: 5,
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 5px',
                        width: '10px',
                        height: '10px',
                    }}></span>
                )}
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
                        <Link to={`/chat/${notification.data.ticketId}?userId=${userIdFromQuery}`} key={index}>
                            <MenuItem sx={{ width: '100%' }}>
                                {notification.type === 'new_chat_message' && `New chat message: ${notification.data.message}`}
                                {notification.type === 'new_ticket' && `New ticket: ${notification.data.title}`}
                                {notification.type === 'update_ticket' && `Updated ticket: ${notification.data.title}`}
                            </MenuItem>
                        </Link>
                    ))
                ) : (
                    <MenuItem>Nenhuma Notificação</MenuItem>
                )}
            </Menu>
        </>
    );
};

export default Notificacao;
