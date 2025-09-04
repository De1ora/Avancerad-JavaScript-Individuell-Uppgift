import { alpha } from '@mui/material/styles';
import { orange, green, red, brand } from '../themePrimitives';

export const feedbackCustomizations = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const baseStyles = {
          borderRadius: 10,
          border: '1px solid tranasparent',
        };

        const severityStyles = {
          success: {
            backgroundColor: green[100],
            color: (theme.vars || theme).palette.text.primary,
            border: `1px solid ${alpha(green[300], 0.5)}`,
            '& .MuiAlert-icon': {
              color: green[500],
            },
            ...theme.applyStyles('dark', {
              backgroundColor: `${alpha(green[900], 0.5)}`,
              border: `1px solid ${alpha(green[800], 0.5)}`,
            }),
          },
          error: {
            backgroundColor: red[100],
            color: (theme.vars || theme).palette.text.primary,
            border: `1px solid ${alpha(red[300], 0.5)}`,
            '& .MuiAlert-icon': {
              color: red[500],
            },
            ...theme.applyStyles('dark', {
              backgroundColor: `${alpha(red[900], 0.5)}`,
              border: `1px solid ${alpha(red[800], 0.5)}`,
            }),
          },
          warning: {
            backgroundColor: orange[100],
            color: (theme.vars || theme).palette.text.primary,
            border: `1px solid ${alpha(orange[300], 0.5)}`,
            '& .MuiAlert-icon': {
              color: orange[500],
            },
            ...theme.applyStyles('dark', {
              backgroundColor: `${alpha(orange[900], 0.5)}`,
              border: `1px solid ${alpha(orange[800], 0.5)}`,
            }),
          },
          info: {
            backgroundColor: brand[100],
            color: (theme.vars || theme).palette.text.primary,
            border: `1px solid ${alpha(brand[300], 0.5)}`,
            '& .MuiAlert-icon': {
              color: brand[500],
            },
            ...theme.applyStyles('dark', {
              backgroundColor: `${alpha(brand[900], 0.5)}`,
              border: `1px solid ${alpha(brand[800], 0.5)}`,
            }),
          },
        }; const severity = ownerState?.severity || 'warning';

        return {
          ...baseStyles,
          ...severityStyles[severity],
        };
      },
    },
  },
};