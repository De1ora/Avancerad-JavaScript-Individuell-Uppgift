import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppTheme from '../styles/AppTheme';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

export default function UserArticleView({ articles, ...props }) {
  const { id } = useParams(); // Get the article ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Find the article with the matching ID
  const article = articles.find(article => article.id === id);

  const handleGoBack = () => {
    navigate('/'); // Navigate back to home page
  };

  // If article not found, show error message
  if (!article) {
    return (
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" color="error" gutterBottom>
              Article Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The article you’re looking for doesn’t exist or may have been removed.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </AppTheme>
    );
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container maxWidth="lg" sx={{ my: 8 }}>
        {/* Back button */}
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 3 }}
        >
          Back to Articles
        </Button>

        {/* Article content */}
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Article title */}
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 'bold',
              lineHeight: 1.2 
            }}
          >
            {article.title}
          </Typography>

          {/* Author and timestamp */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 4,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Avatar sx={{ width: 40, height: 40 }}>
              {article.author.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {article.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(article.timeStamp).toLocaleDateString('en-US', {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            </Box>
          </Box>

          {/* Article content */}
          <Typography 
            variant="body1" 
            component="div"
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap' // Preserves line breaks from the form
            }}
          >
            {article.content}
          </Typography>

          {/* Like and Dislike buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              gap: 1,
              mt: 4,
              pt: 2
            }}
          >
            <IconButton aria-label="like article">
              <ThumbUpOffAltIcon />
            </IconButton>
            <IconButton aria-label="dislike article">
              <ThumbDownOffAltIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </AppTheme>
  );
}