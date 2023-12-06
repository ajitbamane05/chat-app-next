import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
export default function SigIn({handleSubmit,register,submitData,handleSignUp}) {
    const styles = {
        input: {
          color: "black", 
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
                    {...register('username',{required:"Username is required!",})}
                    InputLabelProps={{
                        style: styles.input,
                    }}
                    InputProps={{
                        style: styles.bg,
                    }}
                    focused
                    autoComplete="off"
                />
            </Stack>
            <Stack item>
                <TextField
                    id="outlined-password-input"
                    {...register('password',{required:"Password is required"})}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
            </Stack>
            <Stack>
                <Button variant='contained' onClick={handleSubmit(submitData)} >
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