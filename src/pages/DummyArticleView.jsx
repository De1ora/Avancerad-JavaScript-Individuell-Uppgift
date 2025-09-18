import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppTheme from '../styles/AppTheme';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { apiGetArticleByID } from "../api/DummyArticles";
import { getApiReaction, toggleApiReaction } from "../utilities/DummyReactions";

export default function DummyArticleView({ ...props }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userReaction, setUserReaction] = useState(null);

    const handleGoBack = () => navigate('/');

    // Load article and user reaction on component mount
    useEffect(() => {
        const fetchApiArticle = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchApiArticle = await apiGetArticleByID(id);
                setArticle(fetchApiArticle);

                // Load user reaction from localStorage using utility
                const apiReaction = getApiReaction(id);
                setUserReaction(apiReaction);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchApiArticle();
        }
    }, [id]);

    // Handle Like button click
    const handleLike = () => {
        const newApiReaction = toggleApiReaction(id, 'like');
        setUserReaction(newApiReaction);
    };

    // Handle dislike button click
    const handleDislike = () => {
        const newApiReaction = toggleApiReaction(id, 'dislike');
        setUserReaction(newApiReaction);
    };

    // Loading state
    if (loading) {
        return (
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <Container maxWidth="lg" sx={{ my: 8 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                        sx={{ mb: 3 }}
                    >
                        Back to Articles
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </AppTheme>
        );
    }

    // Error state
    if (error) {
        return (
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <Container maxWidth="lg" sx={{ my: 8 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                        sx={{ mb: 3 }}
                    >
                        Back to Articles
                    </Button>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h4" color="error" gutterBottom>
                            Article Not Found
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            {error}
                        </Typography>
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    </Box>
                </Container>
            </AppTheme>
        );
    }

    // Article not found
    if (!article) {
        return (
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <Container maxWidth="lg" sx={{ my: 8 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleGoBack}
                        sx={{ mb: 3 }}
                    >
                        Back to Articles
                    </Button>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h4" color="error" gutterBottom>
                            Article Not Found
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            The article you're looking for doesn't exist or may have been removed.
                        </Typography>
                    </Box>
                </Container>
            </AppTheme>
        );
    }

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Container maxWidth="lg" sx={{ my: 8 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleGoBack}
                    sx={{ mb: 3 }}
                >
                    Back to Articles
                </Button>

                {/* Article content */}
                <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Article image */}
                    {article.img && (
                        <Box
                            sx={{
                                mb: 4,
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: 2
                            }}
                        >
                            <img
                                src={article.img}
                                alt={article.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                            />
                        </Box>
                    )}

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

                    {/* Article content */}
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                            fontSize: '1.1rem',
                            lineHeight: 1.7,
                            whiteSpace: 'pre-wrap' // Preserves line breaks
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
                            aria-label="like article"
                            color={userReaction === 'like' ? 'primary' : 'default'}
                        >
                            {userReaction === 'like' ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                        </IconButton>

                        <IconButton
                            onClick={handleDislike}
                            aria-label="dislike article"
                            color={userReaction === 'dislike' ? 'primary' : 'default'}
                        >
                            {userReaction === 'dislike' ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                        </IconButton>
                    </Box>

                    {/* Note about article source */}
                    <Box
                        sx={{
                            mt: 4,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            This article is from DummyJSON API for demonstration purposes.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </AppTheme>
    );
}