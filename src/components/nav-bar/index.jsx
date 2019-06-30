import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Divider, Fab, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import logo from 'assets/logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
             <img src={logo} className="app-logo" alt="Babylon Health" />
          </div>
          <Fab variant="extended" color="inherit" aria-label="NU">NU</Fab>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
}

export default NavBar;
