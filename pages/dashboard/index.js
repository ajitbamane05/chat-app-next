import * as React from 'react';
const Jwt = require('jsonwebtoken')
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ChatUserList from '@/Component/ChatUserList';
import axios from 'axios'
import PrimarySearchAppBar from "@/Component/PrimarySearchAppBar";
import Stack from '@mui/material/Stack';
const Dashboard = ({ data, username, users }) => {
  // const rooms = data.map((room) => room)
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
  try {
    const actualToken = token.split(' ')[1];
    const data1 = Jwt.verify(actualToken, process.env.SECRET);
    const { user_id: userId, username } = data1;
    const headers = {
      'authorization': token
    };
    const { data } = await axios.post('/api/room/getmembership', { userId }, { headers });
    // Fetching all users
    const usersData = await axios.get('/api/user/getallusers', { headers });
    const users = usersData.data;
    return {
      props: {
        data,
        username,
        users
      }
    }
  } catch (error) {
    context.res.setHeader('Set-Cookie', 'token=; Max-Age=0; Path=/; HttpOnly');
    console.error('Error fetching data:', error.message);
    // You can handle the error appropriately here, maybe return a redirect or an error prop.
  }
}
