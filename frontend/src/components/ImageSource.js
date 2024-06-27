import './ImageSource.css'; 

const ImageSource = () => {
    return (  
        <div className="imagesource">
        <h5>Give Quizbot an image file, it will create the questions about its content!</h5>
        <div className="imageSource-container">
            <h6>Click here to upload a file</h6>
            <p className='addFile'><i class="bi bi-file-earmark-plus-fill"></i></p>
            <p>PEG ,PNG,GIF ,BMP ,TIFF </p>
        </div>
    </div>        
    );
}
 
export default ImageSource;