import * as React from 'react';
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

export default function UserDialogBox({ users, onClose, open }) {

    const handleClose = () => {
        onClose();
    };

    return (<>

        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Start A new Chat</DialogTitle>
            <List sx={{ pt: 0 }}>
                {users.map((user) => (
                    <ListItem disableGutters key={user.user_id}>
                        <ListItemButton >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.username} secondary={user.email}  />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>

    </>)
}