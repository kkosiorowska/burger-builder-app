import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email.value,
        password: action.password.value,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_KEY;
    if(!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_KEY;
    }
    try {
        const response = yield axios.post(url, authData)

        const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationData);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSucces(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        yield put(actions.authFail(error.response.data.error));
    }

}
