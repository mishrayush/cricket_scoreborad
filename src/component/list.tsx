import * as React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { StyledButton } from "./index";
import { IPlayerListProps } from "../interfaces/index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
      // backgroundColor: theme.palette.primary.main
    },
    paper: {
      padding: theme.spacing(1.5),
      textAlign: "center",
      color: theme.palette.text.secondary,
      fontWeight: "bold",
      margin: "2px",
      background: "lightgray"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

let arr = [] as any;
let newarr = [] as any;
const ListComponent = (props: IPlayerListProps) => {
  const classes = useStyles();

  const [playerList, setPlayerList] = React.useState({
    [props.firstTeamName]: {},
    [props.secondTeamName]: {}
  } as any);

  const [firstTeamPlayerList, setFirstTeamPlayerList] = React.useState();
  const [firstTeam, setFirstTeam] = React.useState();
  const [secondTeam, setSecondTeam] = React.useState();
  const [showButton, setShowButton] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  function handleChange(event: any) {
    let val = event.target.value;
    setFirstTeam(val);
    let splitnamentype = val.split(",");
    let obj = {
      id: Date.now(),
      name: splitnamentype[0],
      skill: splitnamentype[1],
      strike: false,
      status: true,
      runs: 0,
      ballsPlayed: 0
    };
    if (event.keyCode === 13) {
      if (
        (playerList &&
          Object.keys(playerList[props.firstTeamName]).length <= 10 &&
          splitnamentype[1] === "bat") ||
        splitnamentype[1] === "bowl"
      ) {
        arr.push(obj);
        setPlayerList({
          [props.firstTeamName]: arr,
          [props.secondTeamName]: newarr
        });
        setFirstTeam("");
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }
  function onChangeHandler(event: any) {
    let val = event.target.value;
    setSecondTeam(val);
    let splitnamentype = val.split(",");
    let obj = {
      id: Date.now(),
      name: splitnamentype[0],
      skill: splitnamentype[1]
    };

    if (event.keyCode === 13) {
      if (
        (playerList &&
          playerList[props.secondTeamName] &&
          Object.keys(playerList[props.secondTeamName]).length <= 10 &&
          splitnamentype[1] === "bat") ||
        splitnamentype[1] === "bowl"
      ) {
        newarr.push(obj);
        setPlayerList({
          [props.firstTeamName]: arr,
          [props.secondTeamName]: newarr
        });
        setSecondTeam("");
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }
  React.useEffect(() => {
    if (
      Object.keys(playerList[props.firstTeamName]).length === 11 &&
      Object.keys(playerList[props.secondTeamName]).length === 11
    ) {
      setShowButton(true);
    }
  }, [playerList[props.firstTeamName]]);

  function handleClick() {
    if (
      Object.keys(playerList[props.firstTeamName]).length === 11 &&
      Object.keys(playerList[props.secondTeamName]).length === 11
    ) {
      props.dataSave({ [Date.now()]: playerList });
    }
  }
  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={6}>
          {playerList &&
            Object.values(playerList[props.firstTeamName]).map((item: any) => {
              return (
                <Paper
                  className={classes.paper}
                >{`${item.name}/${item.skill}`}</Paper>
              );
            })}
          {Object.keys(playerList[props.firstTeamName]).length != 11 ? (
            <TextField
              style={{ margin: "1px", backgroundColor: "white ", width: "98%" }}
              placeholder="Enter player name,player type"
              fullWidth
              margin="normal"
              value={firstTeam}
              onChange={event => handleChange(event)}
              onKeyUp={event => handleChange(event)}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={6}>
          {playerList &&
            Object.values(playerList[props.secondTeamName]).map((val: any) => {
              return (
                <Paper
                  className={classes.paper}
                >{`${val.name}/${val.skill}`}</Paper>
              );
            })}
          {Object.keys(playerList[props.secondTeamName]).length != 11 ? (
            <TextField
              style={{ margin: "1px", backgroundColor: "white ", width: "98%" }}
              placeholder="Enter player name,player type"
              fullWidth
              margin="normal"
              value={secondTeam}
              onChange={event => onChangeHandler(event)}
              onKeyUp={event => onChangeHandler(event)}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          ) : (
            ""
          )}
        </Grid>
        {Object.keys(playerList[props.firstTeamName]).length === 11 &&
        Object.keys(playerList[props.secondTeamName]).length === 11 ? (
          <StyledButton text="Start Match" clicked={handleClick} />
        ) : (
          ""
        )}
        {isError
          ? " please enter value in this format playername,skill(bat/bowl)"
          : ""}
      </Grid>
    </>
  );
};

export default ListComponent;
