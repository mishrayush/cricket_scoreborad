import { takeLatest } from "redux-saga/effects";
import {
  SAVE_DATA,
  GET_TEAM_DETAIL,
  INNING_DETAIL,
  FETCH_INNING_DETAIL,
  SAVE_DATA_PER_OVER,
  INNING_DETAIL_FETCH
} from "../constants/index";
import {
  onSaveTeamData,
  onFetchTeamDetail,
  onSaveInningDetail,
  onFetchInningDetail,
  onSaveDetailPerOver,
  onInningFetchDetail
} from "./team";

export default function* rootSaga() {
  yield takeLatest(SAVE_DATA, onSaveTeamData);
  yield takeLatest(GET_TEAM_DETAIL, onFetchTeamDetail);
  yield takeLatest(INNING_DETAIL, onSaveInningDetail);
  yield takeLatest(FETCH_INNING_DETAIL, onFetchInningDetail);
  yield takeLatest(FETCH_INNING_DETAIL, onFetchInningDetail);
  yield takeLatest(SAVE_DATA_PER_OVER, onSaveDetailPerOver);
  yield takeLatest(INNING_DETAIL_FETCH, onInningFetchDetail);
}
