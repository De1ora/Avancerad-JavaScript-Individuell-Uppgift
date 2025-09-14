import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import ColorModeIconDropdown from '../styles/ColorModeIconDropdown';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import NavbarDate from './NavbarDate';
import CreateArticleForm from './NewsForm';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NowAndNextIcon from './NowNextIcon';
import Toast from './Toast';

// Controls the form
// Receives addArticle as a prop from Blog component and passes it down to CreateArticleForm component
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    padding: 0,
    maxWidth: '600px',
    width: '100%',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.text.secondary,
}));

export default function Navbar({ addArticle }) {
  const [showArticleForm, setShowArticleForm] = React.useState(false);

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastSeverity, setToastSeverity] = React.useState('success');

  const handleCreateArticleClick = () => {
    setShowArticleForm(true);
  };

  const handleCloseArticleForm = () => {
    setShowArticleForm(false);
  };

  // Toast control functions
  const showToast = (message, severity = 'success') => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const handleToastClose = (event, reason) => { // Varför är event grå? Samma i Footer.jsx...
    if (reason === 'clickaway') return;
    setToastOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
              <NowAndNextIcon
                height='14'
                width='100'
                style={{ marginRight: '16px', marginLeft: '8px' }}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button variant="text" color="info" size="small">
                  About
                </Button>
                <Button variant="text" color="info" size="small">
                  Contact Us
                </Button>
                <Button variant="text" color="info" size="small">
                  Careers
                </Button>
                <Button variant="text" color="info" size="small">
                  Author List
                </Button>
                <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                  Terms
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                <NavbarDate />
              </Typography>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={handleCreateArticleClick}
              >
                Create Article
              </Button>
              <ColorModeIconDropdown />
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>

      <StyledDialog
        open={showArticleForm}
        onClose={handleCloseArticleForm}
        maxWidth="sm"
        fullWidth
      >
        <CloseButton onClick={handleCloseArticleForm}>
          <CloseIcon />
        </CloseButton>
        <DialogContent sx={{ p: 0 }}>
          <CreateArticleForm
            onClose={handleCloseArticleForm}
            addArticle={addArticle}
            showToast={showToast}
          />
        </DialogContent>
      </StyledDialog>
      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        severity={toastSeverity}
        message={toastMessage}
      />
    </>
  );
}