import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {recordListReducer, recordCreateReducer, recordUpdateReducer, recordDeleteReducer, recordDetailsReducer} from './reducers/RecordReducer'
import {userLoginReducer, userRegisterReducer} from './reducers/userReducer'

const reducer = combineReducers({
    recordList: recordListReducer,
    recordCreate: recordCreateReducer,
    recordUpdate: recordUpdateReducer,
    recordDelete: recordDeleteReducer,
    recordDetails: recordDetailsReducer,
    userLogin: userLoginReducer,     
    userRegister: userRegisterReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
