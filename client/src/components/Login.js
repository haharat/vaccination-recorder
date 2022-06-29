import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../actions/userAction'

export default function Login({ history }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch() 
    const userLogin = useSelector((state) => state.userLogin)

    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        console.log('Login UseEffect')
        if (userInfo) {
            history.push("/recordList")
        }
    }, [history, userInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
    };

    return (
        <div className="addPage">
        <form onSubmit={handleSubmit} className="addForm">
            {error && <p>{error}</p>}
            <fieldset>
                <legend>Log In</legend>
                <div className="form-group">
                    <label className="form-label mt-4">User Name</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label mt-4">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Log In</button>
            </fieldset>
        </form>
        </div>
    );
}
