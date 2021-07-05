import React, { createContext, useState } from 'react';
import { createMuiTheme } from "@material-ui/core/styles";

export const ThemeContext = createContext();

export const CustomThemeProvider = (props) => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const backgroundColor = theme === "light" ? "#FFF" : "#333";
  document.body.style.backgroundColor = backgroundColor;

  return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>{props.children}</ThemeContext.Provider>
)};

export const lightTheme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(191, 120, 255, 1)",
      main: "rgba(144, 19, 254, 1)",
      dark: "rgba(107, 0, 202, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: { paper: "#424242", default: "#303030" },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    }
  },
});
