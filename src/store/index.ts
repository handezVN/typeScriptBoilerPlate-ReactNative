import { createStore,applyMiddleware} from 'redux'


import thunk from 'redux-thunk'

const midleWare = [thunk];

import rootReducer from './reducer/index'

const initialState = {} ;

const store = createStore(rootReducer,initialState,applyMiddleware(...midleWare));

export default store;