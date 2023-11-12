import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function SignSignUpWrapper({children}) {
    return (
        <>
            <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ mb: 3, pt: 4, pb: 3, position: "absolute", top: "20vh", zIndex: 10 }}>
                <Grid item xs={10} sm={5} md={3}>
                    <Paper elevation={3} sx={{ bgcolor: 'rgba(255,255,255,0.7)' }}>
                        <Box
                            component="form"
                            p={2} sx={{ pt: 3, pb: 2 }}
                            noValidate
                            autoComplete="off"
                        >
                            <Stack spacing={2}>
                                {children}
                            </Stack>
                        </Box >
                    </Paper>
                </Grid>
            </Grid>

        </>
    )
}