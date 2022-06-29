import React, { useEffect } from "react";
import { listRecords, deleteRecord } from "../actions/recordAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../styles/style.css";

const VaccinationRecords = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const recordList = useSelector(state => state.recordList);
    const { records } = recordList
    const recordDelete = useSelector(state => state.recordDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = recordDelete

    useEffect(() => {
        dispatch(listRecords());
        history.push("/recordList")
        if (!userInfo) {
            history.push("/");
        }
    }, [dispatch, history,
        userInfo,
        successDelete,])

    const handleDelete = (id) => {
        dispatch(deleteRecord(id))
    }

    return (
        <div className="addPage">
            <img src="/images/pexels-photo-5994799.jpeg" className="img-fluid" alt="background-image"></img>
            <Link to="/addRecord" className="btn btn-success" >Add Record</Link>

            <ul className="list-group">

                {records ? records.map((record) => (
                    userInfo?.id === record?.recordedBy &&
                    <li>
                        <div className="card border-success mb-3 col-lg-6 listCard" >
                            <div className="card-header">{record?.vaxDate.substring(0, 10)}</div>
                            <div className="card-body">
                                <h4 className="card-title">Dose {record?.doseNumber}</h4>
                                <p className="card-text">Vaccine Brand: {record?.vaxBrand}</p>
                                <p className="card-text">Vaccine Type: {record?.vaxType}</p>
                                <p className="card-text">Feeling: {record?.feeling}</p>
                                <p className="card-text">Other Description: {record?.description}</p>
                                <Link to={`/recordList/${record._id}/edit`} className="card-link">Edit</Link>
                                <a className="card-link" onClick={() => handleDelete(record._id)}>Delete</a>
                            </div>
                        </div>
                    </li>
                    
                ))
                    : <h1>No Vaccination Record</h1>
                }

            </ul>
            <div>
                <Link to={`/recommendation`} >Plan for Your Next Vaccination</Link>
            </div>
            <div>
                <Link to={`/recordCard`} >Generate Your Vaccination Card</Link>
            </div>
        </div>
    )
}

export default VaccinationRecords;
