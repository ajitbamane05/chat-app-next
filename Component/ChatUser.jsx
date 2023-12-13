
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

function ChatUser() {
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
                        </Stack>
                    </Stack>
                </Paper>
            </Paper>

        </>
    )
}
export default ChatUser