
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
const Jwt = require('jsonwebtoken')
import Alert from '@mui/material/Alert';
import axios from 'axios'
import SigIn from '@/Component/SignIn';
import SignSignUpWrapper from '@/Component/Wrappers/SIgnSignUpWrapper';
import BgImageWrapper from "@/Component/Wrappers/BgImageWrapper";
import Signup from "@/Component/Signup";
export default function Home() {
  const router = useRouter();
  const [signIn, setSignIn] = useState(true)
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState("")
  const [processing, setProcessing] = useState(false)

  const submitData = async (e) => {
    try {
      setMessage("")
      setProcessing(true)
      e.preventDefault();
      const res = await axios.post(
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/login' : '/api/login',
        {
          username: username,
          password: password
        })
      if (res.status === 200) {
        const token = await res.headers['authorization'];
        Cookies.set('token', token);
        router.push("/dashboard");
      }
      if (res.status === 401) {
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

  const createAccount = async (e) => {
    try {
      setMessage("")
      setProcessing(true)
      e.preventDefault();
      const res = await axios.post(
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/user/createuser' : '/api/user/createuser',
        {
          username: username,
          email: email,
          password: password
        })
      if (res.status === 200) {
        setMessage("AccountCreated")
        setProcessing(false)
      }
      if (res.status === 400) {
        console.log(res.message);
        setMessage(res.message)
        console.log("In 400");
        setProcessing(false)
      }
    }
    catch (error) {
      setMessage(error.response?.data.message)
      setProcessing(false)
      return new Error(error.message)
    }
  };

  const handleSignUp = (e) => {
    setSignIn(!signIn)
    setMessage("")
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage("")
  }
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
      <BgImageWrapper />
      <SignSignUpWrapper>
        {processing ? <><Alert severity="success">Processing...</Alert></> :
          <> </>}
        {message == "wrongCredentials" ? <><Alert severity="error">Wrong Credentials!</Alert></>
          : message == "AccountCreated" ? <><Alert severity="success">Account Created Successfully!</Alert></>
          : message == "Email already existed" ? <> <Alert severity="error">Email already existed!</Alert></>
          : message == "Username already existed" ? <> <Alert severity="error">Username already existed!</Alert></>
            : message == "AccuntError" ? <> <Alert severity="error">Error While Creating Account!</Alert></> : <></>}
        {
          signIn ? <><SigIn
            submitData={submitData}
            handleNameChange={handleNameChange}
            handlePassChange={handlePassChange}
            handleSignUp={handleSignUp}
          /></> :
            <>
              <Signup
                createAccount={createAccount}
                handleNameChange={handleNameChange}
                handlePassChange={handlePassChange}
                handleEmailChange={handleEmailChange}
                handleSignUp={handleSignUp}
              />
            </>
        }

      </SignSignUpWrapper>

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

