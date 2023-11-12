import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Signup({createAccount,handleNameChange,handlePassChange,handleEmailChange,handleSignUp}) {
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
                    autoComplete="off"
                />
            </Stack>
            <Stack item>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    type='email'
                    onChange={handleEmailChange}
                    InputLabelProps={{
                        style: styles.input,
                    }}
                    InputProps={{
                        style: styles.bg,
                    }}
                    autoComplete="off"
                />
            </Stack>
            <Stack item>
                <TextField
                    id="outlined-password-input"
                    onChange={handlePassChange}
                    label="New Password"
                    type="password"
                    InputLabelProps={{
                        style: styles.input,
                    }}
                    InputProps={{
                        style: styles.bg,
                    }}
                    autoComplete="current-password"
                />
            </Stack>
            <Stack>
                <Button variant='contained' onClick={createAccount} >
                    Create account
                </Button>
            </Stack>
            <Stack>
                <Typography variant="subtitle2" gutterBottom>
                    Already Have a Account! <span onClick={handleSignUp} style={{color:'blue'}}>SignIn</span>  here
                </Typography>
            </Stack>
        </>
    )
}