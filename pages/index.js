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
import bgImage from '../public/images/bgimage4.jpg'
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

  const submitData = async (e) => {
    e.preventDefault(username, password);

    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        username: username,
        password: password
      })

      if (res.status === 200) {
        const token = await res.headers['authorization'];
        localStorage.setItem('token', token);
        Cookies.set('token', token);
        router.push("/dashboard");
      }
      if (res.status === 401) {
        alert("wrongCredentials")
      }
    }
    catch (error) {
      return new Error(error)
    }
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
    // setMessage("");
  };
  const handlePassChange = (e) => {
    setPassword(e.target.value);
    // setMessage("");
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
        <Paper elevation={3} sx={{ bgcolor: 'rgba(255,255,255,0.5)' }}>
          <Box
            component="form"
            sx={{
              height: 200,
              width: 300,
              pt: 5, pl: 3, pr: 3, pb: 4
            }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2}>

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

    </>
  )
}


export async function getServerSideProps(context) {
  const token = context.req.cookies.token || null;
  if (token) {
    try {
      const actualToken = token?.split(' ')[1]
      console.log(actualToken);
      const data1 = Jwt.verify(actualToken, process.env.SECRET)
      if (data1) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
    }
    catch (error) {
      context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
      return {
        props: {},
      };
    }
  }
  return {
    props: {},
  };
}
