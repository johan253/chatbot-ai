import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/home';
import NotFound from './pages/404';
import Login from './pages/login';
import Chat from './pages/chat';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E433F3',
    },
    secondary: {
      main: '#B74EC0',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  ,
  document.getElementById('root')
);
