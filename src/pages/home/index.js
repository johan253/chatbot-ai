import React from 'react';
import Rex from '../../assets/rex.png';
import { Container, Box, Typography, Avatar, Button, Divider } from '@mui/material';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import getChats from '../../api/getChats'


const HomePage = () => {
  const [chats, setChats] = useState([]);

  const handleClick = (e) => {
    console.log(e.target.id);
  }

  useEffect(() => {
    setChats(getChats());
    }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Active Chats</Typography>
        <Box sx={{ mt: 2 }}>
          {chats
            .filter(chat => chat.active)
            .map(chat => (
              <Box key={chat.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={Rex} />
                <Link className={"ml-5 hover:text-pink-600"} id={chat.id} to={`chat/${chat.id}`}>
                  {chat.name}
                </Link>
              </Box>
            ))}
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Ended Chats</Typography>
          <Box sx={{ mt: 2 }}>
            {chats
              .filter(chat => !chat.active)
              .map(chat => (
                <Box key={chat.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={Rex} />
                  <Link className={"ml-5 hover:text-pink-600"}id={chat.id} to={`chat/${chat.id}`}>
                    {`${chat.name} - ${chat.date}`}
                  </Link>
                </Box>
              ))}
          </Box>
        </Box>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
          Start Another Chat With ReX
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
