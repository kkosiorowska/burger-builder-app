import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucces = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdP4nxiB8gugDD3yUvY2kKJ_3Ha6uwMz4';
       if(!isSignup) {
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdP4nxiB8gugDD3yUvY2kKJ_3Ha6uwMz4';
       }
        axios.post(url, authData)
            .then( response => {
                console.log(response);
                dispatch(authSucces(response.data.idToken, response.data.localId));
            })
            .catch( err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};
