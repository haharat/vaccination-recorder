import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateRecord } from '../actions/recordAction';
import { useHistory, } from "react-router-dom"
import { RECORD_UPDATE_RESET } from '../constants/recordConstants'
import DatePicker from 'react-date-picker';

const EditRecord = ({ match }) => {
    const dispatch = useDispatch();
    const recordId = match.params.id

    const [vaxDate, setVaxDate] = useState(new Date());
    const [vaxType, setVaxType] = useState("");
    const [vaxBrand, setVaxBrand] = useState("");
    const [doseNumber, setDoseNumber] = useState("");
    const [feeling, setFeeling] = useState("");
    const [description, setDescription] = useState("");

    const recordUpdate = useSelector(state => state.recordUpdate);
    const { loading, success, record } = recordUpdate

    const history = useHistory();

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/records/${recordId}`);
            console.log(data)
            setVaxDate(new Date(data.vaxDate));
            setVaxType(data.vaxType);
            setVaxBrand(data.vaxBrand);
            setDoseNumber(data.doseNumber);
            setFeeling(data.feeling);
            setDescription(data.description);
        };

        fetching();

    }, [recordId]);

    const handleUpdate = (event) => {
        event.preventDefault();

        const updatedRecord = {
            vaxDate: vaxDate, 
            vaxType: vaxType, 
            vaxBrand: vaxBrand, 
            doseNumber: doseNumber, 
            feeling: feeling, 
            description: description
        };
        dispatch(updateRecord(recordId, updatedRecord))
    };

    useEffect(() => {
        if (success) {
            history.push(`/recordList`)
            dispatch({ type: RECORD_UPDATE_RESET, payload: record })
        }
    }, [success])


    return (
        <div className="addPage">
            <form onSubmit={handleUpdate} className="addForm">
                <fieldset>
                    <legend>Update Record</legend>
                    <div>
                        <label className="form-label mt-4">Date of Vaccination</label>
                        <DatePicker className="form-control" format="MM/dd/y"
                            onChange={(date) => setVaxDate(date)}
                            value={vaxDate}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Type of Vaccine</label>
                        <select className="form-select" value={vaxType} onChange={(e) => setVaxType(e.target.value)}>
                            <option value="mRNA">mRNA vaccine</option>
                            <option value="Vector">Vector vaccine</option>
                            <option value="Protein subunit">Protein subunit vaccine</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Brand of Vaccine</label>
                        <select className="form-select" value={vaxBrand} onChange={(e) => setVaxBrand(e.target.value)}>
                            <option value="Pfizer">Pfizer-BioNTech</option>
                            <option value="Moderna">Moderna</option>
                            <option value="Johnson and Johnson">Johnson and Johnson</option>
                            <option value="Novavax">Novavax</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Number of Dose</label>
                        <select className="form-select" value={doseNumber} onChange={(e) => setDoseNumber(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Feelings</label>
                        <select className="form-select" value={feeling} onChange={(e) => setFeeling(e.target.value)}>
                            <option value="no reaction">no reaction</option>
                            <option value="only fatigue">only fatigue</option>
                            <option value="low fever">low fever</option>
                            <option value="high fever">high fever</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label mt-4">Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" className="form-control" rows="5"></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit Update</button>
                </fieldset>
            </form>
        </div>
    );
};

export default EditRecord;