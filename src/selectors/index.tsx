import { createSelector } from "reselect";
import { initialState } from "../reducers/teamReducers";

const selectHome = (state: any) => state.team.matchList || initialState;
const selectScoreCard = (state: any) => state.scorecard || initialState;
// state.scorecard.firstInning
let id: any;
if (localStorage.getItem("matchId")) {
  id = localStorage.getItem("matchId");
}
// For first inning bat team selector teamA
const makeSelectFirstInningBattingTeam = (): any =>
  createSelector(
    selectHome,
    teamState => {
      let battingTeamA =
        teamState &&
        teamState[id] &&
        Object.keys(teamState[id]) &&
        Object.keys(teamState[id])[0] &&
        Object.keys(teamState[id])[0];

      let firstInningbatting =
        battingTeamA &&
        Object.values(teamState[id][battingTeamA]).map(
          (item: any, index: number): Object => ({
            ...item,
            status: true,
            runs: 0,
            ballsPlayed: 0,
            order: index
          })
        );
      return firstInningbatting;
    }
  );
// For first inning bowl team selector teamB
const makeSelectFirstInningBowlingTeam = (): any =>
  createSelector(
    selectHome,
    teamState => {
      let BowlingTeamB =
        teamState &&
        teamState[id] &&
        Object.keys(teamState[id]) &&
        Object.keys(teamState[id])[1] &&
        Object.keys(teamState[id])[1];
      let firstInningBowling =
        BowlingTeamB &&
        Object.values(teamState[id][BowlingTeamB]).reduce(
          (firstInningBowling: any, value: any) => {
            if (value.skill === "bowl") {
              firstInningBowling.push({
                ...value,
                overs: 0,
                runGiven: 0,
                wickets: 0
              });
            }
            return firstInningBowling;
          },
          []
        );
      return firstInningBowling;
    }
  );
// For Second inning bat team selector teamB
const makeSelectSecondInningBattingTeam = (): any =>
  createSelector(
    selectHome,
    teamState => {
      let battingTeamB =
        teamState &&
        teamState[id] &&
        Object.keys(teamState[id]) &&
        Object.keys(teamState[id])[1] &&
        Object.keys(teamState[id])[1];

      let secondBattingInning =
        battingTeamB &&
        Object.values(teamState[id][battingTeamB]).map(
          (item: any, index: number): Object => ({
            ...item,
            status: true,
            runs: 0,
            ballsPlayed: 0,
            order: index
          })
        );
      return secondBattingInning;
    }
  );

// For second inning bowl team selector teamA
const makeSelectSeciondInningBowlingTeam = (): any =>
  createSelector(
    selectHome,
    teamState => {
      let BowlingTeamA =
        teamState &&
        teamState[id] &&
        Object.keys(teamState[id]) &&
        Object.keys(teamState[id])[0] &&
        Object.keys(teamState[id])[0];

      let secondInningBowling =
        BowlingTeamA &&
        Object.values(teamState[id][BowlingTeamA]).reduce(
          (secondInningBowling: any, value: any) => {
            if (value.skill === "bowl") {
              secondInningBowling.push({
                ...value,
                overs: 0,
                runGiven: 0,
                wickets: 0
              });
            }
            return secondInningBowling;
          },
          []
        );
      return secondInningBowling;
    }
  );

const makeSelectInningDetail = (): any =>
  createSelector(
    selectScoreCard,
    scoreState =>
      scoreState.firstInning.overs === scoreState.firstInning.totalOver
        ? scoreState.secondInning
        : scoreState.firstInning
  );
const makeSelectData = (): any =>
  createSelector(
    selectScoreCard,
    scoreState => scoreState
  );

const makeSelectFirstInnForScoreCard = (): any =>
  createSelector(
    selectScoreCard,
    scoreState => scoreState.firstInning
  );

const makeSelectSecondInnForScoreCard = (): any =>
  createSelector(
    selectScoreCard,
    scoreState => scoreState.secondInning
  );
export {
  selectHome,
  makeSelectFirstInningBattingTeam,
  makeSelectSecondInningBattingTeam,
  makeSelectFirstInningBowlingTeam,
  makeSelectSeciondInningBowlingTeam,
  makeSelectInningDetail,
  makeSelectData,
  makeSelectFirstInnForScoreCard,
  makeSelectSecondInnForScoreCard
};
