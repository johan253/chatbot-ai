import React from 'react';
import Rex from '../../assets/rex.png';
import { Container, Box, Typography, Avatar, Button, Divider, Paper } from '@mui/material';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import getChats from '../../api/getChats'
import Navbar from '../../components/Navbar';
import addChat from '../../api/addChat';


const HomePage = () => {
  const [chats, setChats] = useState([]);

  const handleNewChatClick = (e) => {
    e.preventDefault();
    const newChat = {
      id: String(chats.length + 1),
      name: `Chat ${chats.length + 1}`,
      active: true,
      date: new Date().toLocaleDateString(),
      messages: [
        {
          id: '1',
          text: 'Hello! I am ReX, your personal assistant. How can I help you today?',
          role: 'assistant',
        },
      ],
    };
    addChat(newChat);
  }

  useEffect(() => {
    setChats(getChats());
    }, []);

  return (
    <Container disableGutters>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Active Chats</Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          {chats
            .filter(chat => chat.active)
            .map(chat => (
              <Paper key={chat.id} elevation={6}
                sx={{ display: 'flex', alignItems: 'center', my: 2, p: 3, maxWidth: 'sm', flexGrow: 1 }}
              >
                <Avatar src={Rex}/>
                <Link className={"ml-5 hover:text-pink-600"} to={`chat/${chat.id}`}>
                  {chat.name}
                </Link>
              </Paper>
            ))}
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Ended Chats</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            {chats
              .filter(chat => !chat.active)
              .map(chat => (
                <Paper key={chat.id} elevation={6}
                  sx={{ display: 'flex', alignItems: 'center', my: 2, p: 3, maxWidth: 'sm', flexGrow: 1 }}
                >
                  <Avatar src={Rex} />
                  <Link className={"ml-5 hover:text-pink-600"} to={`chat/${chat.id}`}>
                    {`${chat.name} - ${chat.date}`}
                  </Link>
                </Paper>
              ))}
          </Box>
        </Box>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }} onClick={handleNewChatClick}>
          Start Another Chat With ReX
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
