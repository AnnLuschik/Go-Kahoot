import React, { useState } from "react";
import clsx from "clsx";
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
import "toastr/build/toastr.min.css";

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
              className={clsx(classes.menuButton, {
                [classes.hide]: isOpened
              })}
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
          <Link to="/" key={0}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Home Page" />
            </ListItem>
          </Link>
          <Link to="/create" key={1}>
            <ListItem button>
              <ListItemIcon>
                <NoteAddIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Create Test" />
            </ListItem>
          </Link>
          <Link to="/tests" key={2}>
            <ListItem button>
              <ListItemIcon>
                <FindInPageIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="List of Tests" />
            </ListItem>
          </Link>
          <Link to="/activetests" key={3}>
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
          <Link to="/documentation" key={4}>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Documentation" />
            </ListItem>
          </Link>
          <Link to="/about" key={5}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Home;
