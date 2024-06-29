import React from 'react';
import './FileSource.css';

const FileSource = () => {
    return (
        <div className="filesource">
            <h5>Give Quizbot a document, and it will create questions about its content!</h5>
            <div className="fileSource-container">
                <h6>Click here to upload a file</h6>
                <label htmlFor="fileInput" className='addFile'>
                    <i className="bi bi-file-earmark-plus-fill"></i>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }} 
                />
                <p>PDF, PowerPoint, OpenDocuments, Pages, Text</p>
                <p>Max 200 MB</p>
            </div>
        </div>
    );
}

export default FileSource;
