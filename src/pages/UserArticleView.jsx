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
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useToastStore from '../store/ToastStore.js';

export default function UserArticleView({ articles, updateArticle, deleteArticle, ...props }) {
    const { id } = useParams(); // Get the article ID from the URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const addToast = useToastStore((state) => state.addToast);

    // Find the article with the matching ID
    const article = articles.find(article => article.id === id);

    // Delete confirmation dialog state with Material-UI Dialog!
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleGoBack = () => navigate('/'); // Navigate back to home page

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleDeleteConfirm = () => {
        deleteArticle(article.id);
        setOpenDialog(false);

        addToast({
            message: 'Article deleted successfully!',
            severity: 'success'
        })

        navigate('/'); // Navigate back to home page after deletion
    };

    // Handle Like button click
    const handleLike = () => {
        if (!article) return;

        const newReaction = article.userReaction === 'like' ? null : 'like';
        updateArticle(article.id, { userReaction: newReaction });
    };

    // Handle dislike button click
    const handleDislike = () => {
        if (!article) return;

        const newReaction = article.userReaction === 'dislike' ? null : 'dislike';
        updateArticle(article.id, { userReaction: newReaction });
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
                        <IconButton
                            onClick={handleLike}
                            aria-label="like article">
                            {article?.userReaction === "like" ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                        </IconButton>

                        <IconButton
                            onClick={handleDislike}
                            aria-label="dislike article"
                        >
                            {article?.userReaction === "dislike" ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                        </IconButton>
                    </Box>
                    {/* Delete button */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        onClick={handleOpenDialog}
                        variant="outlined"
                        sx={{ color: 'inherit', '&:hover': { backgroundColor: 'rgba(255, 36, 36, 0.5)' } }}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                </Box>

                {/* Confirmation dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle>Delete Article</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this article?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                            Yes
                        </Button>
                        <Button onClick={handleCloseDialog}>No</Button>
                    </DialogActions>
                </Dialog>
                </Box>
            </Container>
        </AppTheme>
    );
}