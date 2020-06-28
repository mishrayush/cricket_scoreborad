import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { InputField, PlayerList } from "./index";
import { INameProps } from "../interfaces/index";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
      // backgroundColor: theme.palette.primary.main
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      fontWeight: "bold",
      background: "lightgray"
    }
  })
);

const GridComponent = (props: INameProps) => {
  const classes = useStyles();

  const [firstTeam, setFirstTeam] = useState();
  const [secondTeam, setSecondTeam] = useState();
  const [id, setId] = useState();
  const [isFirstTeamShow, setIsFirstTeamShow] = useState(false);
  const [isSecondTeamShow, setIsSecondTeamShow] = useState(false);

  function handleChange(value: any) {
    if (value.id === "firstteam") {
      setFirstTeam(value.text);
      setIsFirstTeamShow(true);
      setId(value.id);
    }
    if (value.id === "secondteam") {
      setSecondTeam(value.text);
      setIsSecondTeamShow(true);
      setId(value.id);
    }
  }

  useEffect(() => {
    if (isFirstTeamShow && isSecondTeamShow) {
      props.showList(true);
      const data = {
        firstTeamName: firstTeam,
        secondTeamName: secondTeam
      };
      props.teamName(data);
    }
  }, [isFirstTeamShow, isSecondTeamShow]);

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={6}>
          {!isFirstTeamShow ? (
            <InputField
              id="firstteam"
              placeholder="Enter team name"
              onHandleChange={handleChange}
            />
          ) : (
            <Paper className={classes.paper}>{firstTeam}</Paper>
          )}
        </Grid>
        <Grid item xs={6}>
          {!isSecondTeamShow ? (
            <InputField
              id="secondteam"
              placeholder="Enter team name"
              onHandleChange={handleChange}
            />
          ) : (
            <Paper className={classes.paper}>{secondTeam}</Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default GridComponent;
