import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import { authSelectors } from '../../redux/auth';
import { contactsOperations } from 'redux/contacts';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Grid,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
  },
}));

export default function AppBar() {
  const classes = useStyles();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(contactsOperations.clearItems());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Navigation />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>{isLoggedIn ? <UserMenu /> : <AuthNav />}</Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}
