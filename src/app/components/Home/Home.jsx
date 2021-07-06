import React, { useState, useContext, useCallback } from "react";
import clsx from "clsx";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import {
  List,
  Drawer,
  AppBar,
  Divider,
  Toolbar,
  ListItem,
  Typography,
  ListItemText,
  IconButton,
  ListItemIcon,
  Tooltip,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import {
  Shop as ShopIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Info as InfoIcon,
  NoteAdd as NoteAddIcon,
  Assignment as AssignmentIcon,
  FindInPage as FindInPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from "@material-ui/icons";

import { logoImage } from "../../assets";

import useStyles, { Link } from "./styles";
import "toastr/build/toastr.min.css";

import { ThemeContext, lightTheme, darkTheme, themeStyles } from '../../CustomThemeProvider';

export const Home = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { theme: darkMode, toggleTheme: toggleDarkMode } = useContext(ThemeContext);

  const [isOpened, setOpen] = useState(false);

  const toggleTheme = useCallback(() => {
    toggleDarkMode();
    localStorage.setItem('theme', `${darkMode === 'dark' ? 'light' : 'dark'}`); 
  }, [toggleDarkMode, darkMode]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkMode === 'dark' ? darkTheme : lightTheme}>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, { [classes.appBarShift]: isOpened })}
        >
          <Toolbar className={classes.header}>
            <Tooltip title="Show menu">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, {
                  [classes.hide]: isOpened
                })}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <img src={logoImage} alt="Logo" />
            <Typography variant="h6" noWrap className={classes.title}>
              <i>Ooh-banana</i>
            </Typography>
            <FormControlLabel
              control={<Switch 
                checked={darkMode === 'dark'} 
                onChange={toggleTheme} 
              />}
              label={<Typography color={themeStyles.textSecondary}>
                {darkMode === 'dark' ? 'Dark mode' : 'Light mode'}
                </Typography>}
              labelPlacement="bottom"
            />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isOpened,
            [classes.drawerClose]: !isOpened
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: isOpened,
              [classes.drawerClose]: !isOpened
            })
          }}
        >
          <Tooltip title="Hide menu">
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton> 
            </div>
          </Tooltip>
          <Divider />
          <List>
            <Link to="/" key={0}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText 
                  disableTypography
                  primary={
                  <Typography color={themeStyles.textPrimary}>
                    Home Page
                  </Typography>
          }     />
              </ListItem>
            </Link>
            <Link to="/create" key={1}>
              <ListItem button>
                <ListItemIcon>
                  <NoteAddIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText 
                  disableTypography
                  primary={
                  <Typography color={themeStyles.textPrimary}>
                    Create Test
                  </Typography>
          }     />
              </ListItem>
            </Link>
            <Link to="/tests" key={2}>
              <ListItem button>
                <ListItemIcon>
                  <FindInPageIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText 
                  disableTypography
                  primary={
                  <Typography color={themeStyles.textPrimary}>
                    List of Tests
                  </Typography>
          }     />
              </ListItem>
            </Link>
            <Link to="/activetests" key={3}>
              <ListItem button>
                <ListItemIcon>
                  <ShopIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText 
                  disableTypography
                  primary={
                  <Typography color={themeStyles.textPrimary}>
                    List of Active Tests
                  </Typography>
          }     />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link to="/documentation" key={4}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText 
                  disableTypography
                  primary={
                  <Typography color={themeStyles.textPrimary}>
                    Documentation
                  </Typography>
          }     />
              </ListItem>
            </Link>
            <Link to="/about" key={5}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText 
                  disableTypography
                  primary={
                  <Typography color={themeStyles.textPrimary}>
                    About
                  </Typography>
          }     />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main className={classes.content}>{children}</main>
      </div>
    </ThemeProvider>
  );
};
