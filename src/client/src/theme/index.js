import { createTheme } from '@mui/material/styles';

// LitSpark Brand Solutions theme with accessibility focus
// Based on gray and gold color scheme that adheres to WCAG 2.1 standards
const theme = createTheme({
  palette: {
    primary: {
      main: '#F2BF0F', // Gold - meets WCAG AA for large text on dark backgrounds
      light: '#F7D56E',
      dark: '#D6A90D',
      contrastText: '#212529',
    },
    secondary: {
      main: '#343A40', // Dark gray
      light: '#495057',
      dark: '#212529',
      contrastText: '#F8F9FA',
    },
    error: {
      main: '#DC3545', // Accessible red
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFC107', // Accessible amber
      contrastText: '#212529',
    },
    info: {
      main: '#0DCAF0', // Accessible cyan
      contrastText: '#212529',
    },
    success: {
      main: '#198754', // Accessible green
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#212529', // Darkest gray - meets WCAG AAA for normal text
      secondary: '#495057', // Medium gray - meets WCAG AA for normal text
      disabled: '#6C757D', // Light gray with sufficient contrast
    },
    background: {
      default: '#F8F9FA', // Lightest gray
      paper: '#FFFFFF', // White
    },
    divider: '#DEE2E6', // Light gray for dividers
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none', // For better readability
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          '&:focus-visible': {
            outline: '2px solid #F2BF0F',
            outlineOffset: 2,
          },
        },
        containedPrimary: {
          backgroundColor: '#F2BF0F',
          color: '#212529',
          '&:hover': {
            backgroundColor: '#D6A90D',
          },
        },
        containedSecondary: {
          backgroundColor: '#343A40',
          color: '#F8F9FA',
          '&:hover': {
            backgroundColor: '#212529',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#F2BF0F',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#F2BF0F',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#343A40',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#343A40',
          textDecorationColor: '#F2BF0F',
          textDecorationThickness: '2px',
          '&:hover': {
            color: '#F2BF0F',
          },
          '&:focus-visible': {
            outline: '2px solid #F2BF0F',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#343A40',
          '&.Mui-checked': {
            color: '#F2BF0F',
          },
          '&:focus-visible': {
            outline: '2px solid #F2BF0F',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#343A40',
          '&.Mui-checked': {
            color: '#F2BF0F',
          },
          '&:focus-visible': {
            outline: '2px solid #F2BF0F',
            outlineOffset: 2,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#F2BF0F',
            '& + .MuiSwitch-track': {
              backgroundColor: '#D6A90D',
              opacity: 0.9,
            },
          },
        },
        track: {
          backgroundColor: '#6C757D',
          opacity: 0.5,
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
    '0px 3px 1px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
    '0px 3px 3px -2px rgba(0,0,0,0.1),0px 3px 4px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)',
    '0px 2px 4px -1px rgba(0,0,0,0.1),0px 4px 5px 0px rgba(0,0,0,0.07),0px 1px 10px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 5px 8px 0px rgba(0,0,0,0.07),0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1),0px 6px 10px 0px rgba(0,0,0,0.07),0px 1px 18px 0px rgba(0,0,0,0.06)',
    '0px 4px 5px -2px rgba(0,0,0,0.1),0px 7px 10px 1px rgba(0,0,0,0.07),0px 2px 16px 1px rgba(0,0,0,0.06)',
    '0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.07),0px 3px 14px 2px rgba(0,0,0,0.06)',
    '0px 5px 6px -3px rgba(0,0,0,0.1),0px 9px 12px 1px rgba(0,0,0,0.07),0px 3px 16px 2px rgba(0,0,0,0.06)',
    '0px 6px 6px -3px rgba(0,0,0,0.1),0px 10px 14px 1px rgba(0,0,0,0.07),0px 4px 18px 3px rgba(0,0,0,0.06)',
    '0px 6px 7px -4px rgba(0,0,0,0.1),0px 11px 15px 1px rgba(0,0,0,0.07),0px 4px 20px 3px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1),0px 12px 17px 2px rgba(0,0,0,0.07),0px 5px 22px 4px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1),0px 13px 19px 2px rgba(0,0,0,0.07),0px 5px 24px 4px rgba(0,0,0,0.06)',
    '0px 7px 9px -4px rgba(0,0,0,0.1),0px 14px 21px 2px rgba(0,0,0,0.07),0px 5px 26px 4px rgba(0,0,0,0.06)',
    '0px 8px 9px -5px rgba(0,0,0,0.1),0px 15px 22px 2px rgba(0,0,0,0.07),0px 6px 28px 5px rgba(0,0,0,0.06)',
    '0px 8px 10px -5px rgba(0,0,0,0.1),0px 16px 24px 2px rgba(0,0,0,0.07),0px 6px 30px 5px rgba(0,0,0,0.06)',
    '0px 8px 11px -5px rgba(0,0,0,0.1),0px 17px 26px 2px rgba(0,0,0,0.07),0px 6px 32px 5px rgba(0,0,0,0.06)',
    '0px 9px 11px -5px rgba(0,0,0,0.1),0px 18px 28px 2px rgba(0,0,0,0.07),0px 7px 34px 6px rgba(0,0,0,0.06)',
    '0px 9px 12px -6px rgba(0,0,0,0.1),0px 19px 29px 2px rgba(0,0,0,0.07),0px 7px 36px 6px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1),0px 20px 31px 3px rgba(0,0,0,0.07),0px 8px 38px 7px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1),0px 21px 33px 3px rgba(0,0,0,0.07),0px 8px 40px 7px rgba(0,0,0,0.06)',
    '0px 10px 14px -6px rgba(0,0,0,0.1),0px 22px 35px 3px rgba(0,0,0,0.07),0px 8px 42px 7px rgba(0,0,0,0.06)',
    '0px 11px 14px -7px rgba(0,0,0,0.1),0px 23px 36px 3px rgba(0,0,0,0.07),0px 9px 44px 8px rgba(0,0,0,0.06)',
    '0px 11px 15px -7px rgba(0,0,0,0.1),0px 24px 38px 3px rgba(0,0,0,0.07),0px 9px 46px 8px rgba(0,0,0,0.06)'
  ],
});

export default theme;
