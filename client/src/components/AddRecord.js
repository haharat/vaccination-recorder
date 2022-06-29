import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createRecord } from "../actions/recordAction";
import { useDispatch, useSelector } from "react-redux";
import { RECORD_LIST_SUCCESS, RECORD_CREATE_RESET } from '../constants/recordConstants';
import DatePicker from 'react-date-picker';

const AddRecord = () => {
    const dispatch = useDispatch();
    const [vaxDate, setVaxDate] = useState(new Date());
    const [vaxType, setVaxType] = useState("mRNA");
    const [vaxBrand, setVaxBrand] = useState("Pfizer");
    const [doseNumber, setDoseNumber] = useState("1");
    const [feeling, setFeeling] = useState("no reaction");
    const [description, setDescription] = useState("");

    const recordCreate = useSelector((state) => state.recordCreate)
    const { loading, success, record } = recordCreate

    const history = useHistory();

    useEffect(() => {
        if (success) {
            dispatch({ type: RECORD_LIST_SUCCESS })
            history.push("/recordList")
            dispatch({ type: RECORD_CREATE_RESET, payload: record })
        }
    }, [success])

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(createRecord({ vaxDate: vaxDate, vaxType: vaxType, vaxBrand: vaxBrand, doseNumber: doseNumber, feeling: feeling, description: description }))
    };

    return (
        <div className="addPage">
            <form className="addForm" onSubmit={handleAdd}>
                <fieldset>
                    <legend>Add Record</legend>
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
                            <option value="mRNA" >mRNA vaccine</option>
                            <option value="Vector" >Vector vaccine</option>
                            <option value="Protein subunit" >Protein subunit vaccine</option>
                            <option value="other" >other</option>                            
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

                    <button type="submit" className="btn btn-primary">Add Record</button>
                </fieldset>
            </form>
        </div>
    );
}

export default AddRecord;