
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
function ChatUser({ rooms }) {
    rooms.map((room, index) =>{
        
    })
    return (
        <>
            <Paper sx={{ p: 1, mt: 1, height: '80vh',display: 'fixed' }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px',p:1, width: 450, ml: 2, mb: 2, mt: 2, }}
                >
                    <Stack >
                        <Stack>
                            <Link href={'/dashboard'}>
                            <Button  variant='contained' sx={{ ml: 45 , position:'fixed'}} >
                                Back
                            </Button>
                            </Link>
                        </Stack>
                        <Stack>
                            {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="User Name"
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Ali Connors
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </List> */}
                        </Stack>

                    </Stack>

                </Paper>
            </Paper>

        </>
    )
}
export default ChatUser