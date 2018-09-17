import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_USERS_BEGIN:
            return {
              ...state,
              loading: false,
              error: null
            };
      
        case actionTypes.FETCH_USERS_SUCCESS:
            initialState.items = action.payload.users;
            return {
              ...state,
              loading: false,
              items: action.payload.users
            };

        case actionTypes.FETCH_USERS_FAILURE:
            console.error(action);
            console.error(action.payload);
            console.error(action.payload.error);
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              items: []
            };

        default:
            return state;
    }
};
