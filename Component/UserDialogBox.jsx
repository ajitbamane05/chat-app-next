import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import UserContext from './Context/userContext';
import { useContext } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
function UserDialogBox({ users, onClose, open }) {
    const router = useRouter();
    const handleClose = () => {
        onClose();
    };
    const { loginUser } = useContext(UserContext)
    async function startNewChat(inputName, InputType, otherUser, currentUser) {
        try {
            const response = await axios.post(
                process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/room/createdirectroom` : '/api/room/createdirectroom',
                {
                name: inputName,
                type: InputType,
                memberIds: [otherUser, currentUser],
            })
            if (response.status === 200) {
                const room = await response.data;
                if (room) {
                    router.push(`dashboard/chat/${room.newRoom.room_id}`)
                }
            }
            if (response.status === 206) {
                const room = await response.data;
                if (room) {
                    router.push(`dashboard/chat/${room.existingRoom.room_id}`)
                }
            }
        }
        catch (error) {
           return new Error(error.message)
        }

    }
    if (loginUser) {
        return (<>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Start A new Chat</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {users.map((user) => {
                        // console.log(`${loginUser.username} ${user.username}`, 'DIRECT', user.user_id, loginUser.userId)
                        return (
                            <ListItem disableGutters key={user.user_id}
                                onClick={() => startNewChat(`${loginUser.username} ${user.username}`, 'DIRECT', user.user_id, loginUser.userId)}
                            >
                                <ListItemButton >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user.username} secondary={user.email} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Dialog>
        </>)
    }
}
export default UserDialogBox