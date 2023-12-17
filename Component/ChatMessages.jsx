import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';
import React, { useRef } from 'react';
import UserContext from './Context/userContext';
import { useContext } from 'react';
function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + charCode;
        hash |= 0; // Convert to a 32-bit integer
    }
    return hash;
}
function hashToColor(str) {
    const hash = stringToHash(str);
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;
    return `rgb(${r}, ${g}, ${b})`;
}
export default function ChatMessages({ chat, sendChat, handleMessage, message, senderId }) {
    const { loginUser } = useContext(UserContext)
    const endOfList = useRef(null);
    useEffect(() => {
        if (endOfList.current) {
            endOfList.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat,sendChat]);

    if (loginUser) {
        const updatedChats = chat.map((e) => {
            const temp = loginUser.users.find(loginUser => loginUser.user_id === e.senderId);
            if (temp && temp.username) {
                e.username = temp.username;
            }
            return e;
        });


        return (
            <>
                <Stack direction='column' sx={{ width: '60vw' }}>
                    <Stack>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {updatedChats.map((payload, index) => {
                                const now = new Date(payload.createdAt);
                                const hours = String(now.getHours()).padStart(2, '0');
                                const minutes = String(now.getMinutes()).padStart(2, '0');
                                const time2 = `${hours}:${minutes}`;

                                return (
                                    senderId == payload.senderId ?
                                        <Paper
                                            key={payload.message_id}
                                            sx={{ width: 450, height: 50, p: 1, mb: 2, ml: 20, display: 'flex', alignItems: 'end', bgcolor: '#F2F9ED' }}
                                            ref={index === chat.length - 1 ? endOfList : null}
                                        >
                                            <ListItem>
                                                <ListItemText primary={payload.content} sx={{ flexGrow: 2 }} />
                                                <Stack direction='row' sx={{}}>
                                                    <Stack sx={{ flexGrow: 1 }}>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography variant="caption" component="div" sx={{ flexGrow: 1, mt: 2 }}><span>{time2}</span> </Typography>
                                                    </Stack>
                                                </Stack>
                                            </ListItem>
                                        </Paper> :

                                        <Paper
                                            key={payload.message_id}
                                            sx={{ width: 450, height: 50, ml: 4, p: 1, mb: 2, }}
                                            ref={index === chat.length - 1 ? endOfList : null}
                                        >
                                            <ListItem>
                                                <Typography variant="caption" component="span" style={{ color: hashToColor(payload.senderId), fontWeight: 'bold' }} sx={{ position: 'relative', bottom: '25px', right: '10px' }}>{payload.username}</Typography>
                                                <ListItemText primary={payload.content} sx={{}} />
                                                <Stack direction='row' sx={{ pt: 1 }}>
                                                    <Stack sx={{ flexGrow: 1 }}>
                                                    </Stack>
                                                    <Stack>
                                                        <Typography variant="caption" component="div" sx={{ flexGrow: 1, mt: 2 }}><span>{time2}</span> </Typography>
                                                    </Stack>
                                                </Stack>
                                            </ListItem>
                                        </Paper>
                                )
                            })}
                        </List>
                    </Stack>
                    <Stack width={400}>
                        <form id="form" onSubmit={sendChat} style={{ width: '58vw' }}>
                            <input
                                id="input"
                                type='text'
                                name='chat '
                                autoComplete="off"
                                value={message}
                                onChange={handleMessage}
                            />
                            <button type="submit">Send</button>
                        </form>
                    </Stack>

                </Stack>
            </>
        )
    }
}