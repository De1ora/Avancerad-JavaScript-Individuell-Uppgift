import * as React from 'react';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../styles/AppTheme';
import ColorModeSelect from '../styles/ColorModeSelect';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: 'none',
}));

const NewsFormContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

// Accepts and uses the addArticle function as a prop to add a new article
export default function CreateArticleForm({ onClose, addArticle, showToast }) {
    // const [tag, setTag] = React.useState('');

    // const handleTagChange = (event) => {
    // setTag(event.target.value);
    // };

    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Error states for form validation
    const [authorError, setAuthorError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    // Error messages
    const [authorErrorMessage, setAuthorErrorMessage] = useState('');
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [contentErrorMessage, setContentErrorMessage] = useState('');

    const changeAuthor = (e) => {
        const value = e.target.value;
        setAuthor(value);
        if (authorError && value.trim()) {
            setAuthorError(false);
        }
    };

    const changeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
        if (titleError && value.trim()) {
            setTitleError(false);
        }
    };

    const changeContent = (e) => {
        const value = e.target.value;
        setContent(value);
        if (contentError && value.trim()) {
            setContentError(false);
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedAuthor = author.trim();
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        let hasError = false;

        if (!trimmedAuthor) {
            setAuthorError(true);
            setAuthorErrorMessage('Please enter an author name!');
            hasError = true;
        } else {
            setAuthorError(false);
            setAuthorErrorMessage('');
        }

        if (!trimmedTitle) {
            setTitleError(true);
            setTitleErrorMessage('Please enter a title!');
            hasError = true;
        } else {
            setTitleError(false);
            setTitleErrorMessage('');
        }

        if (!trimmedContent) {
            setContentError(true);
            setContentErrorMessage('Please enter some content!');
            hasError = true;
        } else {
            setContentError(false);
            setContentErrorMessage('');
        }

        if (hasError) return;

        // Create a new article object
        const newArticle = {
            id: uuidv4(),
            author: trimmedAuthor,
            title: trimmedTitle,
            content: trimmedContent,
            timeStamp: new Date().toISOString(),
            userReaction: null
        }

        console.log('Article submitted');
        addArticle(newArticle);
        console.log(newArticle);

        if (showToast) {
            showToast('Article published successfully!', 'success');
        }

        if (onClose) { onClose(); }

        // Clear form fields
        setAuthor("");
        setTitle("");
        setContent("");
    };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
            <NewsFormContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Create Article
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate // Så att inte defaultbrowser validering kommer upp!
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        {/* <FormControl error={tagError}>
                            <InputLabel id="tag-label">Tag</InputLabel>
                            <Select
                            labelId="tag-label"
                            id="tag"
                            value={tag}
                            label="Tag"
                            onChange={handleTagChange}
                            >
                                <MenuItem value="global">Global</MenuItem>
                                <MenuItem value="design">Design</MenuItem>
                                <MenuItem value="environment">Environment</MenuItem>
                                <MenuItem value="engineering">Engineering</MenuItem>
                            </Select>
                        </FormControl> */}
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <TextField
                                autoComplete="off" // "title" exists for job titles, not article titles. Therefore, we turn off autocomplete.
                                name="title"
                                required
                                fullWidth
                                id="title"
                                value={title}
                                onChange={changeTitle}
                                placeholder="Your article title"
                                error={titleError}
                                helperText={titleErrorMessage}
                                color={titleError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="content">Content</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="content"
                                value={content}
                                onChange={changeContent}
                                placeholder="Type your article content here..."
                                name="content"
                                autoComplete="off"
                                variant="outlined"
                                error={contentError}
                                helperText={contentErrorMessage}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="author">Author</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="author"
                                value={author}
                                onChange={changeAuthor}
                                placeholder="Author name"
                                name="author"
                                autoComplete="name"
                                variant="outlined"
                                error={authorError}
                                helperText={authorErrorMessage}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Publish Article
                        </Button>
                    </Box>
                </Card>
            </NewsFormContainer>
        </AppTheme>
    );
}