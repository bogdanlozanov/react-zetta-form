import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2'
    },
    secondary: {
      main: '#FF5722'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#212121',
      secondary: '#616161'
    }
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: 14,
    h1: { fontSize: '36px', fontWeight: 700 },
    h2: { fontSize: '28px', fontWeight: 700 },
    h3: { fontSize: '24px', fontWeight: 600 },
    h4: { fontSize: '20px', fontWeight: 600 },
    h5: { fontSize: '18px', fontWeight: 600 },
    h6: { fontSize: '16px', fontWeight: 500 },
    body1: { fontSize: '14px' },
    body2: { fontSize: '12px' },
    button: { fontWeight: 600, textTransform: 'none' }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600
        }
      }
    }
  }
});