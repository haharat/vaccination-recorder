import axios from "axios";
import {
  RECORD_LIST_REQUEST, RECORD_LIST_SUCCESS, RECORD_LIST_FAIL,
  RECORD_CREATE_REQUEST, RECORD_CREATE_SUCCESS, RECORD_CREATE_FAIL,
  RECORD_UPDATE_REQUEST, RECORD_UPDATE_SUCCESS, RECORD_UPDATE_FAIL,
  RECORD_DELETE_REQUEST, RECORD_DELETE_SUCCESS, RECORD_DELETE_FAIL,
  RECORD_DETAILS_REQUEST, RECORD_DETAILS_SUCCESS, RECORD_DETAILS_FAIL
} from '../constants/recordConstants'

export const listRecords = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RECORD_LIST_REQUEST })

    const {userLogin: {userInfo}} = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.get('/api/records', config)

    dispatch({
      type: RECORD_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: RECORD_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const createRecord = (data) => async (dispatch, getState) => {
  try {
    dispatch({type: RECORD_CREATE_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.post('/api/records', data, config)

    dispatch({type: RECORD_CREATE_SUCCESS, payload: response.data})

  } catch(error) {
    dispatch({
      type: RECORD_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const getRecord = (id) => async(dispatch) => {
  try {
    dispatch({type: RECORD_DETAILS_REQUEST})

    const response = await axios.get(`/api/records/${id}`)

    dispatch({type: RECORD_DETAILS_SUCCESS, payload: response.data})
  } catch(error) {
    dispatch({
      type: RECORD_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


export const updateRecord = (id, record) => async (dispatch, getState) => {
  try{
    dispatch({type: RECORD_UPDATE_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.put(`/api/records/${id}`, record, config)

    dispatch({type: RECORD_UPDATE_SUCCESS, payload: response.data})
  }catch(error) {
    dispatch({
      type: RECORD_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteRecord = (id) => async (dispatch, getState) => {
  try{
    dispatch({type: RECORD_DELETE_REQUEST})

    const {userLogin: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const response = await axios.delete(`/api/records/${id}`, config)

    dispatch({type: RECORD_DELETE_SUCCESS, payload: response.data})
  } catch (error) {
    dispatch({
      type: RECORD_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
