import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
const Jwt = require('jsonwebtoken')
import ChatMessages from '@/Component/ChatMessages';
import PrimarySearchAppBar from '@/Component/PrimarySearchAppBar';
import ChatUser from '@/Component/ChatUser';

const Chat = ({ senderId, chatId, chats, data, users, username, headers }) => {
    const rooms = data.map((room) => room)
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([...chats])
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socketInstance = io('/socket.io/');
        console.log(socketInstance);
        socketInstance.emit('joinRoom', chatId, senderId);
        socketInstance.on('chat', (payload) => {
            setChat((chat) => [...chat, payload])
        })
        setSocket(socketInstance);
        return () => {
            socketInstance.emit('leaveRoom', chatId, senderId);
            socketInstance.disconnect()
        }
    }, [chatId,senderId])

    const sendChat = async (e) => {
        e.preventDefault()
        const now = new Date();
        await axios.post(`https://chat-app-pro.site/api/chat/sendmessage`, { content: message, senderId: senderId, roomId: chatId }, { headers: headers })
            .then(response => {
                response.data
            })
            .catch(error => {
                console.error('There was an error:', error.response);
            });
        socket.emit('chat', {
            content: message, senderId: senderId, createdAt: now, roomId: chatId
        })
        setMessage('')
    }
    const handleMessage = async (e) => {
        await setMessage(e.target.value)
    }

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <PrimarySearchAppBar username={username} />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default' }}
                >
                    <Toolbar />
                    <div style={{ width: '100vw' }}>
                        <Stack direction='row' spacing={2}>
                            <Stack sx={{ display: 'fixed', top: 50, height: '80vh', overflowY: 'hidden', overflowX: 'hidden' }} >
                                <ChatUser rooms={rooms} />
                            </Stack>
                            <Stack sx={{ maxHeight: '600px', overflowY: 'scroll;', overflowX: 'hidden' }}>
                                <ChatMessages chat={chat} sendChat={sendChat} handleMessage={handleMessage} message={message} senderId={senderId} users={users} />
                            </Stack>
                        </Stack>
                    </div>
                </Box>
            </Box>
        </div>
    );
}

export default Chat;


export async function getServerSideProps(context) {
    const token = context.req.cookies.token || null;
    if (token) {
        try {
            const headers = {
                'authorization': token
            };
            const actualToken = token.split(' ')[1]
            const data1 = Jwt.verify(actualToken, process.env.SECRET)
            const userId = data1.user_id
            console.log(userId);
            const username = data1.username
            const chatId = context.params.chatId
            console.log(chatId);
            const senderId = userId
            const [res, chatResponse, usersData] = await Promise.all([axios.post('https://chat-app-pro.site/api/room/getmembership', {
                userId: userId
            }, { headers: headers }),
            axios.post('https://chat-app-pro.site/api/chat/getchat', {
                roomId: chatId
            }, { headers: headers }),
            axios.get('https://chat-app-pro.site/api/user/getallusers', { headers: headers })
            ])
            const data = res.data
            const chats = chatResponse.data
            const users = usersData.data
            return {
                props: {
                    senderId,
                    chatId,
                    chats,
                    data, users, username, headers
                }
            }
        }
        catch (error) {
            context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    }
    else {
        context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}
