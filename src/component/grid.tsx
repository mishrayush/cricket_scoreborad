import * as React from "react";
import styled from "@emotion/styled";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
      // backgroundColor: theme.palette.primary.main
    },
    paper: {
      padding: "7px",
      textAlign: "center",
      color: theme.palette.text.secondary,
      fontWeight: "bold"
    }
  })
);

const GridComponent = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>Team Selection</Paper>
      </Grid>
    </Grid>
  );
};
export default GridComponent;
