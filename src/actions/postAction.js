import * as actionTypes from './actionTypes';

export const fetchPostsSuccess = posts => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  payload: { posts }
});

export const fetchPostsError = error => ({
  type: actionTypes.FETCH_POSTS_FAILURE,
  payload: { error }
});

export function fetchPosts() {
    
        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'
        });
        let sendData = {
            mode: 'cors',
            header: header
        };
        return dispatch => {
          return fetch("https://jsonplaceholder.typicode.com/posts/", sendData)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
              console.log(json);
              dispatch(fetchPostsSuccess(json));
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