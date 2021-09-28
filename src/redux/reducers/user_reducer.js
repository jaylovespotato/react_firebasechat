import {
    SET_USER
} from '../actions/types'


//유저 정보를 currentUser에 넣어줄것임
const initialUserState = {
    currentUser: null,
    // 로그인시작하면 true. 끝나면 false
    isLoading: true

}

export default function(state = initialUserState, action){
    switch(action.type){
        case SET_USER:
            // dispatch -> action을 통해 들어오면 user정보를 reducer에서 받을 때, 
            return{
                ...state,
                currentUser: action.payload,
                isLoading: false
            }
        default:
            return state;
    }

}