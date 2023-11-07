import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
const Jwt = require('jsonwebtoken')
import Alert from '@mui/material/Alert';
import bgImage from '../public/images/bgimage2_cp.jpg'
import axios from 'axios'
const myLoader = ({ src }) => {
  return `${src}`
}
export default function Home() {
  const styles = {
    input: {
      color: "black", // Set your desired font color here
    },
    bg: {
      borderColor: "black",
    },
  };
  const router = useRouter();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("")
  const [processing, setProcessing] = useState(false)

  const submitData = async (e) => {
    try {
      setMessage("")
      setProcessing(true)
      e.preventDefault();
      const res = await axios.post('/api/login', {
        username: username,
        password: password
      })
      console.log(res.status);
      if (res.status === 200) {
        const token = await res.headers['authorization'];
        Cookies.set('token', token);
        router.push("/dashboard");
      }
      if (res.status === 401) {
        alert("Wrong cred")
        setMessage("wrongCredentials")
        setProcessing(false)
      }
    }
    catch (error) {
      setMessage("wrongCredentials")
      setProcessing(false)
      return new Error(error.message)
    }
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
    setMessage("");
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
    setMessage("");
  };

  return (
    <>
      <Image
        loader={myLoader}
        src={bgImage}
        unoptimized
        alt="baground image"
        fill
        sizes="(min-width: 808px) 50vw, 100vw"
        quality={75}
        priority="true"
        blurDataURL={'data:image/webp;base64,...'}
        placeholder="blur"
        style={{
          objectFit: 'cover', // cover, contain, none
        }}
      />
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ mb: 3, pt: 4, pb: 3, position: "absolute", top: "30vh", zIndex: 10 }}>
        <Grid item xs={10} sm={5} md={3}>
        <Paper elevation={3} sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}>
          <Box
            component="form"
            p={2} sx={{ pt: 3, pb: 2 }}
            noValidate
            autoComplete="off"
            >
            <Stack spacing={2}>
            {processing ? <><Alert severity="success">Processing...</Alert></> :
              <> </>}
            {message == "wrongCredentials" ? <><Alert severity="error">Wrong Credentials!</Alert></> : <></>}
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
                  Don&apos;t have account? SignUp here
                </Typography>
              </Stack>
            </Stack>
          </Box >
        </Paper>
        </Grid> 
      </Grid>

    </>
  )
}


export async function getServerSideProps(context) {
  const token = await context.req.cookies.token || null;
  if (!token) {
    return { props: {} };
  }
  try {
    const actualToken = token.split(' ')[1];
    const data1 = Jwt.verify(actualToken, process.env.SECRET);
    if (data1) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  } catch (error) {
    context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

