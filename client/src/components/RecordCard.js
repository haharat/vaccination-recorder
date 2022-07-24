import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/style.css";
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const RecordCard = () => {
    const recordList = useSelector(state => state.recordList);
    const { records } = recordList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            });

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);

            const { fileName, filePath } = res.data; //destructuring

            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0)
        }
    };
    return (
        <div className="card-container">
            
            <div className="card border-success mb-3" >
                <div className="card-body">
                    <h4 className="card-title">Name: {userInfo?.fullname}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Date of Birth: {userInfo?.birthday.substring(0, 10)}</h6>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">No. of dose</th>
                                <th scope="col">Product Manufacturer</th>
                                <th scope="col">Vaccination Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records ? records.map((record) => (
                                userInfo?.id === record?.recordedBy &&
                                <tr>
                                    <th scope="row">{record?.doseNumber}</th>
                                    <td>{record?.vaxBrand}</td>
                                    <td>{record?.vaxDate.substring(0, 10)}</td>
                                </tr>
                            ))
                                : <h1>No Vaccination Record</h1>
                            }
                        </tbody>
                    </table>
                    <Link to={`/recordList`} className="card-link">Back to Record List</Link>
                </div>
            </div>

            <br />
            <h5 className="text-center">Upload your paper vaccination card image</h5>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                    <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename} 
                    </label>
                </div>

                <Progress percentage={uploadPercentage} />

                <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mt-4'
                />
            </form>
            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                    </div>
                </div>
            ) : null}

        </div>
    )
}

export default RecordCard;
