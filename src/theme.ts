import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    text: {
      primary: '#333333', // Text color
      secondary: '#555555', // Secondary text color
    },
    primary: {
      main: '#413f3f', // Основной цвет текста
    },
    secondary: {
      main: '#000000', // Цвет кнопок
    },
    background: {
      default: '#c9c8c8', // Фон карточек
      paper: '#adadad', // Фон контейнеров
    },
  },
  typography: {
    body1: {
      fontSize: '1rem', // Default body text size
    },
    fontFamily: '"Neue Machina", sans-serif',
    h1: {
      fontFamily: '"Laviossa", serif',
      fontSize: '97px',
      color: '#413f3f',
    },
    h3: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    button: {
      fontSize: '20px',
      textTransform: 'none',
    },
  },
  spacing: 4, // Default spacing unit
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // Set a custom border radius for all buttons
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '3rem', // Custom font size for h1
          color: '#1976d2', // Custom color for h1
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#c9c8c8',
        },
      },
    },
  },

  customFonts: {
    neueMachina: '"Neue Machina", sans-serif',
    laviossa: '"Laviossa", serif',
  },
});

declare module '@mui/material/styles' {
  interface Theme {
    customFonts: {
      neueMachina: string;
      laviossa: string;
    };
  }
  interface ThemeOptions {
    customFonts?: {
      neueMachina?: string;
      laviossa?: string;
    };
  }
}
