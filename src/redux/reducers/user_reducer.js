import {
    SET_USER,
    CLEAR_USER,
    SET_PHOTO_URL,
} from '../actions/types'


//유저 정보를 currentUser에 넣어줄것임
const initialUserState = {
    currentUser: null,
    // 로그인시작하면 true. 끝나면 false
    isLoading: true

}

export default function(state = initialUserState, action){
    // dispatch -> action을 통해 들어오면 user정보를 reducer에서 받을 때, 
    switch(action.type){
        case SET_USER:
            return{
                ...state,
                currentUser: action.payload,
                isLoading: false
            }

        case CLEAR_USER:
            return{
                currentUser: null,
                isLoading:false
            }

        case SET_PHOTO_URL:
            return {
                ...state,
                currentUser: { ...state.currentUser, photoURL: action.payload },
                isLoading: false
            }    
        default:
            return state;
    }

}