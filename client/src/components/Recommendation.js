import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAge, getDateInterval, showEligibility } from "../algorithm/eligibility"

const Recommendation = () => {
    const dispatch = useDispatch();
    const recordList = useSelector(state => state.recordList);
    const { records } = recordList
    console.log(recordList)

    const userLogin = useSelector((state) => state.userLogin)
    const { loading: loginLoading, error: loginError, userInfo } = userLogin
    console.log(userInfo)
    console.log(new Date(userInfo.birthday))

    //find the latest record
    let max = 0;
    let userRecords = []
    for (let i = 0; i < records?.length; i++) {
        if(userInfo?.id === records[i]?.recordedBy) {
            userRecords.push(records[i])
        }       
    }

    for(let i = 0; i < userRecords?.length - 1; i++){
        if (userRecords[i]?.doseNumber < userRecords[i + 1]?.doseNumber) {
            max = i + 1;
        }
    }

    //find user age
    let userage = getAge(userInfo.birthday)

    //find the latest dose number
    let userdoseNumber = userRecords[max]?.doseNumber

    //find the date of last vax
    let vaxDate=userRecords[max]?.vaxDate

    //find the last vax brand
    let userlastVaxBrand = userRecords[max]?.vaxBrand

    //find the number of days from last vax
    let userdateInterval = getDateInterval(vaxDate)

    return (
        
        <div className="card-container">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Next Vaccine Recommendation</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Based on your profile:</h6>
                    <p className="card-text">{showEligibility(userage, userdoseNumber, userlastVaxBrand, userdateInterval)}</p>
                    <Link to={`/recordList`} className="card-link">Back to Record List</Link>
                </div>
            </div>
        </div>
        
    )
}

export default Recommendation;