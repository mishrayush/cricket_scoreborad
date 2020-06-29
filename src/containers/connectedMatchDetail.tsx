import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { connect } from "react-redux";
import {
  makeSelectFirstInningBattingTeam,
  makeSelectFirstInningBowlingTeam,
  makeSelectSecondInningBattingTeam,
  makeSelectSeciondInningBowlingTeam,
  makeSelectInningDetail,
  makeSelectData,
  makeSelectFirstInnForScoreCard,
  makeSelectSecondInnForScoreCard
} from "../selectors/index";
import { createStructuredSelector } from "reselect";

import {
  setInningDetail,
  updateInningDetail,
  strikeUpdate,
  inningStatusUpdate,
  saveDataPerOver
} from "../actions/index";
import { strikeRotate, bowlerRatate, winningTeam } from "../utils/index";

import { Scorecard, StyledButton } from "../component/index";
import { IPropsConnectedMatchDetail } from "../interfaces";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "lightgray"
  },
  media: {
    height: 150,
    background: "white",
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 50
  },
  pos: {
    marginBottom: 15
  }
});

let arr = [] as any;
let counter: number = 0;
let count: number = 6;
let batting: any;
let bowling: any;
let PlayerListForStrike: any;
let BowlerLine: any;
let dataPerOver: any;

function ConnectedMatchDetail(props: IPropsConnectedMatchDetail) {
  const classes = useStyles();
  const [batingOrder, setBattingOrder] = React.useState();
  const [bowlingOrder, setBowlingOrder] = React.useState();
  const [runSingleBowl, setRunSingleBowl] = React.useState();
  const [currentOverRun, setCurrentOverRun] = React.useState([]);
  const [buttonHideaAndShow, setButtonHideandShow] = React.useState(false);
  const [inningChangeButton, setInningChangeButton] = React.useState(false);
  const [batInningChange, setBatInningChange] = React.useState();
  const [bowlInningChange, setBowlInningChange] = React.useState();
  const [winnerName, setWinnerName] = React.useState();

  useEffect(() => {
    if (
      props.innData.firstInning.overs !== props.innData.firstInning.totalOver
    ) {
      setBatInningChange(props && props.firstInningBat && props.firstInningBat);
      setBowlInningChange(
        props && props.firstInningBowl && props.firstInningBowl
      );
    } else {
      setBatInningChange(
        props && props.secondInningBat && props.secondInningBat
      );
      setBowlInningChange(
        props && props.firstInningBowl && props.secondInningBowl
      );
    }

    battingLineUp();
    bowlingLineUp();
    PlayerListForStrike = props && props.InningDetail && props.InningDetail;
    BowlerLine =
      props && props.InningDetail && props.InningDetail.bowlingLineUp;
    dataPerOver = props && props.InningDetail && props.innData;

    if (props.InningDetail.overs === props.InningDetail.totalOver) {
      setInningChangeButton(true);
      setButtonHideandShow(true);
      props.onInningFinish();
      clearInterval(intervel);
    }
    setWinnerName(
      winningTeam(props && props.InningDetail && props.innData, intervel)
    );
  }, [props]);

  function battingLineUp() {
    if (
      localStorage.getItem("index") === null ||
      localStorage.getItem("index") === undefined
    ) {
      let ids = localStorage.setItem("index", "2");
    }
    let val: any =
      localStorage.getItem("index") && localStorage.getItem("index");
    batting = batInningChange && batInningChange;
    let onGround = batting && batting.splice(+val);
    setBattingOrder(batting);
  }

  function bowlingLineUp() {
    if (
      localStorage.getItem("bowlindex") === null ||
      localStorage.getItem("bowlindex") === undefined
    ) {
      let ids = localStorage.setItem("bowlindex", "0");
    }

    let val: any =
      localStorage.getItem("bowlindex") && localStorage.getItem("bowlindex");
    bowling = bowlInningChange && Object.values(bowlInningChange)[+val];
    setBowlingOrder(bowling);
  }

  useEffect(() => {
    if (
      props &&
      props.InningDetail &&
      typeof props.InningDetail.battingLineUp === "object"
    ) {
      let innings = {
        firstInningBat: props.firstInningBat,
        firstInningBowl: props.firstInningBowl,
        secondInningBat: props.secondInningBat,
        secondInningBowl: props.secondInningBowl
      };
      props.onInningDetail(innings);
    }
  }, [
    props && props.firstInningBat && props.firstInningBowl,
    props.secondInningBat,
    props.secondInningBowl
  ]);
  // Start Over
  const handleClick = () => {
    setButtonHideandShow(true);
    // inningStatusUpdate
    arr = [];

    if (counter === 6) {
      let InningData = dataPerOver && dataPerOver;
      props.onsaveDataPerOver(dataPerOver && dataPerOver);
      counter = 0;
    }
    setIntervel();
  };

  // Random get value from array
  function overs(): any {
    let newArr = ["0", "1", "2", "3", "4", "5", "6", "Wk", "Wd", "NoBall"];
    let randomValue = newArr[Math.floor(Math.random() * newArr.length)];
    setRunSingleBowl(randomValue);
    currentOver(randomValue);
  }

  let intervel: any;
  function currentOver(run: string) {
    if (run === "Wd" || run === "NoBall") {
      arr.push(run);
      setCurrentOverRun(arr);
    } else {
      counter = counter + 1;
      arr.push(run);
      setCurrentOverRun(arr);
    }

    let strikeC = strikeRotate(
      PlayerListForStrike && PlayerListForStrike,
      run,
      counter
    );

    let Bowling = bowlerRatate(BowlerLine, counter);
    props.onUpdateInning({ run, arr, counter, strikeC, Bowling });

    clearIntervel();
  }

  function clearIntervel() {
    if (counter === count) {
      clearInterval(intervel);
      setButtonHideandShow(false);
    }
  }

  function setIntervel() {
    intervel = setInterval(overs, 2000);
  }

  function onChangeInningHandler() {
    props.onsaveDataPerOver(dataPerOver && dataPerOver);
    props.history.push("/scoreboard");
  }

  return (
    <>
      <Card className={classes.root}>
        <Scorecard
          InningDetail={props && props.InningDetail}
          runSingleBowl={runSingleBowl}
          currentOverRun={currentOverRun}
          counter={counter}
          winner={winnerName}
        />
        {!buttonHideaAndShow ? (
          <CardActions>
            <StyledButton text="Start Over" clicked={handleClick} />
          </CardActions>
        ) : (
          ""
        )}
        {inningChangeButton ? (
          <CardActions>
            <StyledButton text="ScoreBoard" clicked={onChangeInningHandler} />
          </CardActions>
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
const mapStateToProps = createStructuredSelector<any, any>({
  firstInningBat: makeSelectFirstInningBattingTeam(),
  firstInningBowl: makeSelectFirstInningBowlingTeam(),
  secondInningBat: makeSelectSecondInningBattingTeam(),
  secondInningBowl: makeSelectSeciondInningBowlingTeam(),
  InningDetail: makeSelectInningDetail(),
  innData: makeSelectData()
  // UpdatedFirstInningDetail: makeSelectFirstInnForScoreCard(),

  // UpdatedSecondInningDetail: makeSelectSecondInnForScoreCard()
});

const mapDispatchToProps = (dispatch: any) => ({
  onInningDetail: (data: any) => dispatch(setInningDetail(data)),
  onUpdateInning: (data: any) => dispatch(updateInningDetail(data)),
  onStrikeChange: (data: any) => dispatch(strikeUpdate(data)),
  onInningFinish: () => dispatch(inningStatusUpdate()),
  onsaveDataPerOver: (data: any) => dispatch(saveDataPerOver(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedMatchDetail);
