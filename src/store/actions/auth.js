import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucces = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };
        console.log(authData)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdP4nxiB8gugDD3yUvY2kKJ_3Ha6uwMz4', authData)
            .then( response => {
                console.log(response);
                dispatch(authSucces(response.data));
            })
            .catch( err => {
                console.log(err);
                dispatch(authFail(err));
            });
    };
};
