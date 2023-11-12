import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
export default function SigIn({submitData,handleNameChange,handlePassChange,handleSignUp}) {
    const styles = {
        input: {
          color: "black", // Set your desired font color here
        },
        bg: {
          borderColor: "black",
        },
      };
      
    return (
        <>
            <Stack item>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    onChange={handleNameChange}
                    InputLabelProps={{
                        style: styles.input,
                    }}
                    InputProps={{
                        style: styles.bg,
                    }}
                    // color="black"
                    focused
                    autoComplete="off"
                />
            </Stack>
            <Stack item>
                <TextField
                    id="outlined-password-input"
                    onChange={handlePassChange}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
            </Stack>
            <Stack>
                <Button variant='contained' onClick={submitData} >
                    Sign in
                </Button>
            </Stack>
            <Stack>
                <Typography variant="subtitle2" gutterBottom>
                    Don&apos;t have account? <span onClick={handleSignUp} style={{color:'blue'}}>Create account</span>  here
                </Typography>
            </Stack>
        </>
    )
}