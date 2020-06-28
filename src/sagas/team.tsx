import { put, call } from "redux-saga/effects";
import {
  teamDetail,
  overDetail,
  setBatsmenScoreCard,
  getInningDetail,
  fetchedInningDetail,
  setfetchedInningDetail
} from "../actions/index";
import axios from "../axios/axios";
import {
  POST,
  GET,
  postInningData,
  fetchInning,
  getInningData,
  saveInningDetail
} from "../services/index";

function* onSaveTeamData(action: any) {
  try {
    // const res = yield axios.post("/team.json", action.payload);
    const res = yield POST(action.payload);

    yield put(teamDetail(action.payload));
    // console.log("action", Object.keys(action.payload)[0]);
    const matchId = Object.keys(action.payload)[0] as string;
    yield localStorage.setItem("matchId", matchId);

    // yield put(overDetail());
  } catch (err) {
    console.log(err);
  }
}

function* onFetchTeamDetail(action: any): object {
  try {
    const res = yield GET();
    let detail = Object.values(res) as [];
    let matchData = {};
    for (let i = 0; i < detail.length; i++) {
      let aaaa = Object.keys(detail[i]).includes(action.payload);
      if (aaaa === true) {
        matchData = detail[i];
      }
    }
    yield put(teamDetail(matchData));
    // yield put(setBatsmenScoreCard(matchData));
  } catch (err) {
    console.log(err);
  }
}
function* onSaveInningDetail(action: any): any {
  try {
    const res = yield saveInningDetail(action.payload);
    if (res) {
      yield put(getInningDetail());
    }
  } catch (err) {
    console.log(err);
  }
}

function* onFetchInningDetail(): object {
  try {
    const res = yield getInningData();
    if (res) {
      yield put(fetchedInningDetail(res));
    }
  } catch (err) {
    console.log(err);
  }
}

function* onSaveDetailPerOver(action: any) {
  try {
    const res = yield postInningData(action.payload);
  } catch (err) {
    console.log(err);
  }
}

function* onInningFetchDetail() {
  try {
    const res = yield fetchInning();
    if (res) {
      yield put(setfetchedInningDetail(res));
    }
  } catch (err) {
    console.log(err);
  }
}
export {
  onSaveTeamData,
  onFetchTeamDetail,
  onSaveInningDetail,
  onFetchInningDetail,
  onSaveDetailPerOver,
  onInningFetchDetail
};
