import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from '../constants/userConstants'
import axios from 'axios'

export const login = (username, password, fullname, birthday) => async(dispatch) => {//this is made possible by thunk. async(dispatch) is a callback function
    try {
        dispatch({type: USER_LOGIN_REQUEST})

        const config = { 
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await axios.post('/api/users/login', {username, password, fullname, birthday}, config)


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem("userInfo", JSON.stringify(response.data))

    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT})
}
//
export const register= (username, email, password, fullname, birthday, gender) =>async(dispatch) => {
    try{
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const response = await axios.post('/api/users/register', {username, email, password, fullname, birthday, gender}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: response.data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem("userInfo", JSON.stringify(response.data))


    } catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
          })
    }
}
