import {
    SET_CURRENT_CHAT_ROOM
} from '../actions/types'


//유저 정보를 currentUser에 넣어줄것임
const initialChatRoomState = {
    currentChatRoom: null
}

export default function(state = initialChatRoomState, action){
    // dispatch -> action을 통해 들어오면 user정보를 reducer에서 받을 때, 
    switch(action.type){
        case SET_CURRENT_CHAT_ROOM:
            return{
                ...state,
                currentChatRoom: action.payload
            }
        default:
            return state;
    }

}