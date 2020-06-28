import {
  TEAM_DETAIL,
  SAVE_DATA,
  OVER_DETAIL,
  GET_TEAM_DETAIL,
  SCORECARD,
  INNING_DETAIL,
  FETCH_INNING_DETAIL,
  SET_FETCHED_INNING_DETAIL,
  UPDATE_INNING_DETAIL,
  STRIKE_CHANGE,
  INNING_END,
  SAVE_DATA_PER_OVER,
  INNING_DETAIL_FETCH,
  SET_INNING
} from "../constants/index";

export const saveData = (payload: object): object => {
  return {
    type: SAVE_DATA,
    payload
  };
};

export const teamDetail = (payload: object) => {
  return { type: TEAM_DETAIL, payload };
};

export const overDetail = (): object => {
  return { type: OVER_DETAIL };
};

export const getTeamDetail = (payload: string): object => {
  return { type: GET_TEAM_DETAIL, payload };
};

export const setBatsmenScoreCard = (payload: object): object => {
  return { type: SCORECARD, payload };
};

export const setInningDetail = (payload: object): object => {
  return { type: INNING_DETAIL, payload };
};

export const getInningDetail = () => {
  return { type: FETCH_INNING_DETAIL };
};
export const fetchedInningDetail = (payload: object) => {
  return { type: SET_FETCHED_INNING_DETAIL, payload };
};
export const updateInningDetail = (payload: object): object => {
  return { type: UPDATE_INNING_DETAIL, payload };
};

export const strikeUpdate = (payload: object): object => {
  return { type: STRIKE_CHANGE, payload };
};

export const inningStatusUpdate = (): object => {
  return {
    type: INNING_END
  };
};

export const saveDataPerOver = (payload: Object): object => {
  return {
    type: SAVE_DATA_PER_OVER,
    payload
  };
};
export const fetchInningDetail = (): object => {
  return {
    type: INNING_DETAIL_FETCH
  };
};
export const setfetchedInningDetail = (payload: object) => {
  return {
    type: SET_INNING,
    payload
  };
};
