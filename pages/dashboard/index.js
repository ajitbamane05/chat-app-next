import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ChatUserList from '@/Component/ChatUserList';
const Jwt = require('jsonwebtoken')
import axios from 'axios'
import PrimarySearchAppBar from "@/Component/PrimarySearchAppBar";

import Stack from '@mui/material/Stack';
const Dadhboard = ({ data, username, users }) => {
  const rooms = data.map((room) => room)
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <PrimarySearchAppBar username={username} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default' }}
        >
          <Toolbar />

          <div style={{ width: '100vw' }}>
            <Stack direction='row' spacing={2}>
              <Stack>
                <ChatUserList rooms={rooms} users={users} />
              </Stack>
              <Stack>

              </Stack>
            </Stack>

          </div>

        </Box>
      </Box>

    </div>
  );
}

export default Dadhboard;

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || null;
  if (token) {
    const actualToken = token.split(' ')[1]
    const data1 = Jwt.verify(actualToken, process.env.SECRET)
    const userId = data1.user_id
    try {
      const headers = {
        'authorization': token
      };
      const username = data1.username
      const res = await axios.post('http://localhost:3000/api/room/getmembership', {
        userId: userId
      }, { headers: headers })
      const data = res.data
      console.log(data);
      const usersData = await axios.get('http://localhost:3000/api/user/getallusers', { headers: headers })
      const users = usersData.data
      return {
        props: {
          data,
          username,
          users
        }
      }

    }
    catch (error) {
      context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  }
  else {
    context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
