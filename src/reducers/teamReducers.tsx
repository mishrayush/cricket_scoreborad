import { Action } from "redux";
import { TEAM_DETAIL, STRIKE_CHANGE } from "../constants/index";

export interface ITeamReducer {
  teamDetail: Object;
}

interface ITeamData {
  teamData: Object;
}

export let initialState = {
  matchList: {}
};

const team = (state = initialState, action: any) => {
  switch (action.type) {
    case TEAM_DETAIL:
      return {
        ...state,
        matchList: action.payload
      };
    case STRIKE_CHANGE:
      // let strike = Object.values(state.matchList).map();
      // debugger;
      let matchid: any = localStorage.getItem("matchId");
      let strikeid: any = localStorage.getItem("strike");
      let matchList: any = Object.values(state.matchList)[0];
      let teamA: any = Object.values(matchList)[0];
      let teamB: any = Object.values(matchList)[1];
      let teamAname: string = Object.keys(matchList)[0];
      let teamBname: string = Object.keys(matchList)[1];

      let isExist: boolean = false;
      Object.values(teamA).forEach((ele: any, index: number) => {
        if (ele.id === +strikeid) {
          teamA[index].strike = true;
          isExist = true;
        } else {
          teamA[index].strike = false;
        }
      });

      let update: any = {
        ...state,
        matchList: {
          [matchid]: { [teamAname]: { ...teamA }, [teamBname]: { ...teamB } }
        }
      };
      return update;
    default:
      return state;
  }
};

export { team };
