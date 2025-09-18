import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { apiGetArticles } from '../api/DummyArticles';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export function Search() {
    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

export default function MainContent() {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleFocus = (index) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    const handleClick = () => { // Denna ska senare bytas med React Routing till själva inlägget
        console.info('You clicked the filter chip.');
    };

    // Fetch articles from DummyJSON API
    useEffect(() => {
        const fetchDummyArticles = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedArticles = await apiGetArticles();
                setArticles(fetchedArticles.slice(0, 6)); // Limit to 6 articles for display
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDummyArticles();
    }, []);

    // Loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>
                    <Typography variant="h1" gutterBottom>
                        Now & Next
                    </Typography>
                    <Typography>Stay in the loop with the latest news.</Typography>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            </Box>
        );
    }

    // Error state
    if (error) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>
                    <Typography variant="h1" gutterBottom>
                        Now & Next
                    </Typography>
                    <Typography>Stay in the loop with the latest news.</Typography>
                </div>
                <Alert severity="error">
                    Failed to load articles: {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div>
                <Typography
                    variant="h1"
                    gutterBottom
                >
                    Now & Next
                </Typography>
                <Typography>Stay in the loop with the latest news.</Typography>
            </div>
            <Box
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    flexDirection: 'row',
                    gap: 1,
                    width: { xs: '100%', md: 'fit-content' },
                    overflow: 'auto',
                }}
            >
                <Search />
                <IconButton size="small" aria-label="RSS feed">
                    <RssFeedRoundedIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', md: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'start', md: 'center' },
                    gap: 4,
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        gap: 3,
                        overflow: 'auto',
                    }}
                >
                    <Chip onClick={handleClick} size="medium" label="All categories" /> {/* Förbättringsförslag: Lägg till en funktion för att filtrera artiklar från taggarna. https://dummyjson.com/docs/posts#posts-tag */}
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Global"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Design"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Environment"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                    <Chip
                        onClick={handleClick}
                        size="medium"
                        label="Engineering"
                        sx={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'row',
                        gap: 1,
                        width: { xs: '100%', md: 'fit-content' },
                        overflow: 'auto',
                    }}
                >
                    <Search />
                </Box>
            </Box>
            <Grid container spacing={2} columns={12}>
                {articles[0] && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <StyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(0)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                        >
                            <CardMedia
                                component="img"
                                alt={articles[0].title}
                                image={articles[0].img}
                                sx={{
                                    aspectRatio: '16 / 9',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            />
                            <StyledCardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {articles[0].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {articles[0].content}
                                </StyledTypography>
                            </StyledCardContent>
                        </StyledCard>
                    </Grid>
                )}

                {articles[1] && (
                <Grid size={{ xs: 12, md: 6 }}>
                    <StyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(1)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
                    >
                        <CardMedia
                            component="img"
                            alt={articles[1].title}
                            image={articles[1].img}
                            aspect-ratio="16 / 9"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        />
                        <StyledCardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {articles[1].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {articles[1].content}
                                </StyledTypography>
                            </StyledCardContent>
                        </StyledCard>
                    </Grid>
                )}

                {articles[2] && (
                <Grid size={{ xs: 12, md: 4 }}>
                    <StyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(2)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                        sx={{ height: '100%' }}
                    >
                        <CardMedia
                            component="img"
                            alt={articles[2].title}
                            image={articles[2].img}
                            sx={{
                                height: { sm: 'auto', md: '50%' },
                                aspectRatio: { sm: '16 / 9', md: '' },
                            }}
                        />
                        <StyledCardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {articles[2].title}
                                </Typography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {articles[2].content}
                                </StyledTypography>
                            </StyledCardContent>
                        </StyledCard>
                    </Grid>
                )}

                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                        {articles[3] && (
                        <StyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(3)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                            sx={{ height: '100%' }}
                        >
                            <StyledCardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}
                            >
                                <div>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {articles[3].title}
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {articles[3].content}
                                    </StyledTypography>
                                </div>
                            </StyledCardContent>
                        </StyledCard>
                        )}
                        {articles[4] && (
                        <StyledCard
                            variant="outlined"
                            onFocus={() => handleFocus(4)}
                            onBlur={handleBlur}
                            tabIndex={0}
                            className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                            sx={{ height: '100%' }}
                        >
                            <StyledCardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                }}
                            >
                                <div>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {articles[4].title}
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {articles[4].content}
                                    </StyledTypography>
                                </div>
                            </StyledCardContent>
                        </StyledCard>
                        )}
                    </Box>
                </Grid>

                {articles[5] && (
                <Grid size={{ xs: 12, md: 4 }}>
                    <StyledCard
                        variant="outlined"
                        onFocus={() => handleFocus(5)}
                        onBlur={handleBlur}
                        tabIndex={0}
                        className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                        sx={{ height: '100%' }}
                    >
                        <CardMedia
                            component="img"
                            alt={articles[5].title}
                                image={articles[5].img}
                            sx={{
                                height: { sm: 'auto', md: '50%' },
                                aspectRatio: { sm: '16 / 9', md: '' },
                            }}
                        />
                        <StyledCardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {articles[5].title}
                            </Typography>
                            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                {articles[5].content}
                            </StyledTypography>
                        </StyledCardContent>
                    </StyledCard>
                </Grid>
                )}
            </Grid>
        </Box>
    );
}