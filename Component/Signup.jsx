import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Signup({createAccount,handleSignUp,register,handleSubmit}) {
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
                    {...register("username", {required: "Username is required!"})}
                    label="Username"
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
                    {...register("email", {required: "Email is required!",minLength:5})}
                    label="Email"
                    type='email'
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
                    {...register("password",{required:"Password is required!",minLength:5})}
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
                <Button variant='contained' onClick={handleSubmit(createAccount)} >
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