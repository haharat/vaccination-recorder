import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userAction';
import DatePicker from 'react-date-picker';

export default function Register({ history }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullname, setFullname] = useState("")
    const [birthday, setBirthday] = useState(new Date())
    const [gender, setGender] = useState("")

    const dispatch = useDispatch()
    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push("/addRecord")
        }
    }, [history, userInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(username, email, password, fullname, birthday, gender))
    };

    return (
        <div className="addPage">
        <form className="addForm" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Register</legend>
                <div className="form-group">
                    <label className="form-label mt-4">User Name</label>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label  className="form-label mt-4">Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label  className="form-label mt-4">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control"  placeholder="Password" />
                </div>
                <div className="form-group">
                    <label className="form-label mt-4">Full Name</label>
                    <input onChange={(e) => setFullname(e.target.value)} value={fullname} type="text" className="form-control"  />
                </div>
                <div>
                <label className="form-label mt-4">Date of Birth</label>
                    <DatePicker className="form-control" format="MM/dd/y"
                        onChange={(date)=>setBirthday(date)}
                        value={birthday}
                    />
                </div>

                <fieldset className="form-group">
                    <label className="mt-4">Gender</label>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input onChange={(e) => setGender(e.target.value)} type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="male" />
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input onChange={(e) => setGender(e.target.value)} type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="female" />
                            Female
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input onChange={(e) => setGender(e.target.value)} type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="other" />
                            Other
                        </label>
                    </div>
                </fieldset>

                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
            <a href="/login" variant="body2">
                Already have an account? Sign in
            </a>
        </form>
        </div>
    );
}
