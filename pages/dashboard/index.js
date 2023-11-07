import * as React from 'react';
const Jwt = require('jsonwebtoken')
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ChatUserList from '@/Component/ChatUserList';
import axios from 'axios'
import PrimarySearchAppBar from "@/Component/PrimarySearchAppBar";
import Stack from '@mui/material/Stack';
const Dashboard = ({ data, username, users, actualToken, userId }) => {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <PrimarySearchAppBar username={username} actualToken={actualToken} userId={userId} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default' }}
        >
          <Toolbar />
          <div style={{ width: '100vw' }}>
            <Stack direction='row' spacing={2}>
              <Stack>
                <ChatUserList rooms={data} users={users} />
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

export default Dashboard;

export async function getServerSideProps(context) {
  const token = await context.req.cookies.token || null;
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  try {
    const actualToken = token.split(' ')[1]
    const data1 = Jwt.verify(actualToken, process.env.SECRET)
    const userId = data1.user_id
    const headers = {
      'authorization': token
    };
    const username = data1.username
    const [res, usersData] = await Promise.all([axios.post('/api/room/getmembership', {
      userId: userId
    }, { headers: headers }),
    axios.get('/api/user/getallusers', { headers: headers })
    ])

    const data = res.data
    const users = usersData.data
    return {
      props: {
        data,
        username,
        users,
        actualToken,
        userId
      }
    }
  }
  catch (e) {
    context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
