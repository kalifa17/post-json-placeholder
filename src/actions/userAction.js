import * as actionTypes from './actionTypes';

export const fetchUsersSuccess = users => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: { users }
});

export const fetchUsersError = error => ({
  type: actionTypes.FETCH_USERS_FAILURE,
  payload: { error }
});

export function fetchUsers() {
    
        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'
        });
        let sendData = {
            mode: 'cors',
            header: header
        };
        return dispatch => {
          return fetch("https://jsonplaceholder.typicode.com/users/", sendData)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
              console.log(json);
              dispatch(fetchUsersSuccess(json));
              return json;
            })
        };
}
  
function handleErrors(response) {
    if (!response.ok) {
        console.error(response);
        throw Error(response.statusText);
    }
    return response;
}