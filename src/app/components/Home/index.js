import React, { useState } from "react";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import { useTheme } from "@material-ui/core/styles";
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
  Tooltip
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

import useStyles, { Link } from "./styles";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [isOpened, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ToastContainer />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: isOpened })}
      >
        <Toolbar>
          <Tooltip title="Show menu">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, { [classes.hide]: isOpened })}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap>
            Go-Kahoot
          </Typography>
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
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
          </Link>
          <Link to="/create">
            <ListItem button>
              <ListItemIcon>
                <NoteAddIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Create Test" />
            </ListItem>
          </Link>
          <Link to="/tests">
            <ListItem button>
              <ListItemIcon>
                <FindInPageIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="List of Tests" />
            </ListItem>
          </Link>
          <Link to="/activetests">
            <ListItem button>
              <ListItemIcon>
                <ShopIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="List of Active Tests" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {["Documentation", "About"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <AssignmentIcon fontSize="large" />
                ) : (
                  <InfoIcon fontSize="large" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Home;
