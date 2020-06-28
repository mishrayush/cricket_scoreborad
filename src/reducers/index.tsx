import { combineReducers } from "redux";
import { team, ITeamReducer } from "./teamReducers";
import { scorecard, IOverReducer } from "./scorecardReducer";

export interface IState {
  teams: ITeamReducer;
  scorecard: IOverReducer;
}

const rootReducer = combineReducers({ team, scorecard });

export default rootReducer;
