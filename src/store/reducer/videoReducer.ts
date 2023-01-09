import { ADD_STREAM, MY_STREAM } from "../action/type";

const initialState = {
    myStream: null ,
    streams : []
};

export default (state = initialState, {type , payload}:any) => {
    switch (type) {
        case MY_STREAM:
            return {
                ...state,
                myStream: payload
            }
        case ADD_STREAM:
            return {
                ...state,
                streams:[...state.streams,payload]
            }    
        default:
            return state;
}
}