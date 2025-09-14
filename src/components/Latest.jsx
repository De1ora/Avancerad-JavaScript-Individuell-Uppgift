import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

function Author({ author, timeStamp }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <Avatar sx={{ width: 24, height: 24 }}>
          {author.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="caption">
          {author}
        </Typography>
      </Box>
      <Typography variant="caption">
        {new Date(timeStamp).toLocaleDateString('en-US', {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })}
      </Typography>
    </Box>
  );
}

Author.propTypes = {
  author: PropTypes.string.isRequired,
  timeStamp: PropTypes.string.isRequired,
};

// Will receive and display the articles prop. "export default function Latest({ articles }) {"
export default function Latest({ articles }) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  if (!articles || articles.length === 0) {
    return (
      <div>
        <Typography variant="h2" gutterBottom>
          Latest
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ my: 4 }}>
          No articles yet. Create your first article to see it here!
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ my: 4 }}>
        {articles.map((article, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              {/*<Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography> */}
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.content}
              </StyledTypography>

              <Author author={article.author} timeStamp={article.timeStamp} />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Pagination hidePrevButton hideNextButton count={8} boundaryCount={8} />
      </Box>
    </div>
  );
}