import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './styles/AppTheme';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Receives articles and addArticle as props and passes them down to appropriate child components (Navbar, MainContent and Latest)
export default function Blog({ articles, addArticle, ...props }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Navbar addArticle={addArticle} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent articles={articles} />
        <Latest articles={articles} />
      </Container>
      <Footer />
      <Toast />
    </AppTheme>
  );
}