import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router';
import Layout from './layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#343795',
      dark: '#070707',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E83F5B',
    },
    text: {
      primary: '#F8F9FA',
    },
    background: {
      default: '#363535',
      paper: '#c1c7cc',
    },
    p:{
      primary:'#CCCC'
    }
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <AuthProvider>
        <Layout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Container sx={{ marginTop: '20px' }}>
            <AppRouter />
          </Container>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;