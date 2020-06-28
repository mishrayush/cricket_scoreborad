import { Action } from "redux";
import { object } from "prop-types";
import { IScoreReducer } from "../interfaces/index";

export interface IOverReducer {
  scorecard: Object;
}

let initialState: IScoreReducer = {
  firstInning: {
    totalOver: 2,
    score: 0,
    extra: 0,
    overs: 0, //10 overs increase accordingly
    balls: 12, //60 balls
    witckets: 0,
    netRunrate: 0,
    currentOver: [],
    striker: 0,
    nonStriker: 0,
    battingLineUp: {},
    bowlingLineUp: {},
    isInningComplete: false
  },
  secondInning: {
    totalOver: 2,
    score: 0,
    extra: 0,
    overs: 0, //10 overs increase accordingly
    balls: 12, //60 balls
    witckets: 0,
    netRunrate: 0,
    currentOver: 0,
    striker: 0,
    nonStriker: 0,
    battingLineUp: {},
    bowlingLineUp: {},
    isInningComplete: false
  }
};

const scorecard = (state = initialState, action: any): IScoreReducer => {
  switch (action.type) {
    case "SET_INNING":
      return {
        ...state,
        firstInning: { ...action.payload.firstInning },
        secondInning: { ...action.payload.secondInning }
      };
    case "SET_FETCHED_INNING_DETAIL":
      console.log(
        "Object.values(action.payload)",
        Object.values(action.payload)
      );
      let a: any = Object.values(action.payload)[0];
      let batval: any = a.firstInningBat;
      let bowlVal: any = a.firstInningBowl;
      let secBatval = a.secondInningBat;
      let secBowlval = a.secondInningBowl;

      let first = {
        ...state.firstInning,
        battingLineUp: batval,
        bowlingLineUp: bowlVal,
        currentOver: []
      };
      let second = {
        ...state.secondInning,
        battingLineUp: secBatval,
        bowlingLineUp: secBowlval,
        currentOver: []
      };

      console.log("let c", first, second);
      return {
        ...state,
        firstInning: first,
        secondInning: second
      };
    case "UPDATE_INNING_DETAIL":
      console.log("[1111]", action.payload);
      let currentInning: string =
        state.firstInning.overs === state.firstInning.totalOver
          ? "secondInning"
          : "firstInning";
      let data: any = scoreCard(
        action.payload.run,
        state,
        action.payload.arr,
        action.payload.counter,
        currentInning,
        action.payload.strikeC,
        action.payload.Bowling
      );

      return {
        ...state,
        [currentInning]: { ...data }
      };
    // case "INNING_END":
    //   let inningEnd: object = {
    //     ...state.firstInning,
    //     isInningComplete: true
    //   };
    // return { ...state, firstInning: { ...inningEnd } };
    default:
      return state;
  }
};

export { scorecard };

function scoreCard(
  run: string,
  state: any,
  currentOver: any,
  counter: number,
  currentInning: string,
  playerId: any,
  bowlers: any
): any {
  let val = {};
  let player = {};
  let abc = state[currentInning];
  let overArr = state[currentInning].currentOver;
  let score = state[currentInning].score;
  let overs = state[currentInning].overs;
  let witcket = state[currentInning].witckets;
  let extras = state[currentInning].extra;
  let battingorder: any = abc.battingLineUp && Object.values(abc.battingLineUp);
  let bowlingOrder: any = abc.bowlingLineUp && Object.values(abc.bowlingLineUp);
  // console.log("currentInning", currentInning, state[currentInning]);
  switch (run) {
    case "0":
      console.log("in 0", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker)
              battingorder[index].ballsPlayed = +item.ballsPlayed + 1;
            battingorder[index].strike = true;
          }),
        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "1":
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = item.ballsPlayed + 1;
              battingorder[index].strike = true;
              battingorder[index].runs = item.runs + 1;
            } else {
              battingorder[index].strike = false;
            }
          }),
        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven + 1;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      console.log("player122", player);
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 1,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "2":
      console.log("in 2", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = item.ballsPlayed + 1;
              battingorder[index].strike = true;
              battingorder[index].runs = item.runs + 2;
            } else {
              battingorder[index].strike = false;
            }
          }),
        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven + 2;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 2,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "3":
      console.log("in 3", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = item.ballsPlayed + 1;
              battingorder[index].strike = true;
              battingorder[index].runs = item.runs + 3;
            } else {
              battingorder[index].strike = false;
            }
          }),

        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven + 3;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 3,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "4":
      console.log("in 4", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = item.ballsPlayed + 1;
              battingorder[index].strike = true;
              battingorder[index].runs = item.runs + 4;
            } else {
              battingorder[index].strike = false;
            }
          }),

        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven + 4;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 4,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "5":
      console.log("in 5", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = item.ballsPlayed + 1;
              battingorder[index].strike = true;
              battingorder[index].runs = item.runs + 5;
            } else {
              battingorder[index].strike = false;
            }
          }),
        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven + 5;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 5,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "6":
      console.log("in 6", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = item.ballsPlayed + 1;
              battingorder[index].strike = true;
              battingorder[index].runs = item.runs + 6;
            } else {
              battingorder[index].strike = false;
            }
          }),
        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].runGiven = item.runGiven + 6;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 6,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "Wk":
      console.log("in wk", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].ballsPlayed = +item.ballsPlayed + 1;
              battingorder[index].strike = true;
              // battingorder[index].status = false;
            } else {
              battingorder[index].strike = false;
            }
            if (item.strike === true) {
              if (item.id !== playerId.striker) {
                // battingorder[index].ballsPlayed = item.ballsPlayed + 1;
                battingorder[index].strike = false;
                battingorder[index].status = false;
              }
            }
          }),

        bowlingLineUp:
          bowlingOrder &&
          bowlingOrder.map((item: any, index: number) => {
            if (item.id === bowlers.id) {
              bowlingOrder[index].wickets = item.wickets + 1;
            }
            if (item.id === bowlers.id && counter === 6) {
              bowlingOrder[index].overs = item.overs + 1;
            }
          })
      };
      val = {
        ...state[currentInning],
        balls: abc.balls - 1,
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        witckets: witcket + 1,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "Wd":
      console.log("in wd", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].strike = true;
            } else {
              battingorder[index].strike = false;
            }
          })
      };
      val = {
        ...state[currentInning],
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 1,
        extra: extras + 1,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    case "NoBall":
      console.log("in noball", run);
      player = {
        ...state[currentInning],
        battingLineUp:
          battingorder &&
          battingorder.map((item: any, index: number) => {
            if (item.id === playerId.striker) {
              battingorder[index].strike = true;
            } else {
              battingorder[index].strike = false;
            }
          })
      };
      val = {
        ...state[currentInning],
        currentOver: currentOver,
        overs: counter === 6 ? overs + 1 : +overs,
        score: score + 1,
        extra: extras + 1,
        striker: playerId.striker,
        nonStriker: playerId.nonStriker
      };
      break;
    default:
      val = { ...state };
  }
  return val;
}
