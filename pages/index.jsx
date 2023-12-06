
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
import { useForm } from "react-hook-form"

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm()

  const router = useRouter();
  const [signIn, setSignIn] = useState(true)
  const [message, setMessage] = useState("")
  const submitData = async (data) => {
    try {
      setMessage("")
      const res = await axios.post(
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/login' : '/api/login',
        data
      )
      if (res.status === 200) {
        const token = await res.headers['authorization'];
        Cookies.set('token', token);
        router.push("/dashboard");
      }
      if (res.status === 401) {
        setError('WrongCred', {
          message: "Wrong Credentials!"
        })
      }
    }
    catch (error) {
      setError('WrongCred', {
        message: "Wrong Credentials!"
      })
      setTimeout(() => reset(), 2000)
      return new Error(error.message)
    }
  };

  const createAccount = async (data) => {
    try {
      setMessage("")
      const res = await axios.post(
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/user/createuser' : '/api/user/createuser',
        data
      )
      if (res.status === 200) {
        setMessage("AccountCreated")
      }
      if (res.status === 400) {
        setMessage(res.message)
      }
    }
    catch (error) {
      setMessage(error.response?.data.message)
      setTimeout(() => {
        reset()
        setMessage("")
      }, 2000)
      return new Error(error.message)
    }
  };

  const handleSignUp = (e) => {
    setSignIn(!signIn)
    setMessage("")
  }

  return (
    <>
      <BgImageWrapper />
      <SignSignUpWrapper>
        {isSubmitting ? <><Alert severity="success">Processing...</Alert></> :
          <> </>}
        {errors.WrongCred ? <><Alert severity="error">{errors.WrongCred.message}</Alert></> :
          errors.username ? <><Alert severity="error">{errors.username.message}</Alert></> :
            errors.email ? <><Alert severity="error">{errors.email.message ? errors.email.message : 'Email should exceed length 5'}</Alert></> :
              errors.password ? <><Alert severity="error">{errors.password.message ? errors.password.message : 'Password should exceed length 5'}</Alert></> :
                message == "AccountCreated" ? <><Alert severity="success">Account Created Successfully!</Alert></> :
                  message == "Email already existed" ? <> <Alert severity="error">Email already existed!</Alert></> :
                    message == "Username already existed" ? <> <Alert severity="error">Username already existed!</Alert></> :
                      message == "AccuntError" ? <> <Alert severity="error">Error While Creating Account!</Alert></> : <></>
        }
        {
          signIn ? <>
            <SigIn
              register={register}
              handleSubmit={handleSubmit}
              submitData={submitData}
              handleSignUp={handleSignUp}
            /></> :
            <>
              <Signup
                register={register}
                handleSubmit={handleSubmit}
                createAccount={createAccount}
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

