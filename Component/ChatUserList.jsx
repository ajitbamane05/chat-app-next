import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { useState } from 'react';
import UserDialogBox from './UserDialogBox';
function ChatUserList({ rooms, users }) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [searchQuery, setSearchQuery] = useState("");
    const filteredRooms = rooms.filter((room) =>
        room.room?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.room?.members[0].user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.room?.members[1].user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleSearchChange = (event) => {
        setSearchQuery(event?.target?.value);
    };
    return (
        <>
            <Paper sx={{ p: 1, mt: 1, height: '80vh' }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 460, ml: 2, mb: 2, mt: 2 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Chats..."
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" >
                        <GroupAddIcon />
                    </IconButton>

                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleClickOpen}>
                        <AddCommentIcon />
                    </IconButton>
                    <UserDialogBox
                        open={open}
                        onClose={handleClose}
                        users={users}
                    />
                </Paper>
                <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', textDecoration: 'none' }}>
                    {filteredRooms.map((room, index) => {
                        const now = new Date(room.room.updatedAt);
                        const hours = String(now.getHours()).padStart(2, '0');
                        const minutes = String(now.getMinutes()).padStart(2, '0');
                        const time2 = `${hours}:${minutes}`;

                        return (<Link key={room.room.room_id} href={`/dashboard/chat/${room.room.room_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem>
                                <ListItemButton sx={{ mb: 2, textDecoration: 'none' }} >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        room.room.type === 'GROUP'
                                            ? room.room.name
                                            : (
                                                (room.room.members[1]?.user.user_id || "Deleted user") === room.userId
                                                    ? (room.room.members[0]?.user.username || "Deleted user")
                                                    : (room.room.members[1]?.user.username || "Deleted user")
                                            )
                                    } />
                                    <Typography sx={{ color: 'black' }}>{time2}</Typography>
                                </ListItemButton>
                            </ListItem>
                        </Link>)
                    })
                    }
                </List>
            </Paper>

        </>
    )
}
export default ChatUserList