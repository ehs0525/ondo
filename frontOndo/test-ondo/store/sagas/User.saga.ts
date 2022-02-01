import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { takeEvery, call, put, takeLatest, all, fork } from "redux-saga/effects"
import { User } from "../interfaces/User.interface";
import { userActions } from "../slice/user";
import { KakaoLogin, ProfileEdit, GetUserState } from '../api/User.api'
import { stringify } from "querystring";
import { Router } from "next/router";



function* getKakaoKey() {
  interface tokentype extends AxiosResponse {
    token: string;
  } 
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const response: tokentype = yield call(KakaoLogin, code);
    // console.log(response.token)
    // console.log(code)
    yield put(userActions.getKakaoKeySuccess(response.token))
  } catch (err) {
    yield put(userActions.getKakaoKeyError(err));
  }
}

function* watchGetKakaoKey() {
  yield takeLatest(userActions.getKakaoKey, getKakaoKey);
}

function* requestprofileEdit (nickname: any) {
  try {
    yield call(ProfileEdit, nickname.data);
    yield put(userActions.setnickname(nickname.data));
  } catch (err) {
    console.log(err);
  }
}

function* watchProfileEdit() {
  yield takeLatest(userActions.profileEdit, requestprofileEdit);
}

function* getUserState() {
  try {
    const code = new URL(window.location.href).searchParams.get("code");
    const userdata: AxiosResponse = yield call(GetUserState, code)
    console.log(userdata)
    yield put(userActions.setEmail(userdata))
    yield put(userActions.setnickname(userdata))
  } catch(err) {
    console.log(err)
  }
}

function* watchgetUserState() {
  yield takeLatest(userActions.getUser, getUserState);
}

export default function* getKakaoKeySaga() {
  yield all([fork(watchGetKakaoKey), fork(watchProfileEdit), fork(watchgetUserState)])
}