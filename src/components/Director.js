import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar
}))

function Director() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.appBarSpacer} />
      <h1>Director</h1>
    </div>
  );
}

export default Director;