
import './AudioSource.css'; 
const AudioSource = () => {
    return ( 
        <div className="audiosource">
        <h5>Give Quizbot an audio or video file, it will create the questions about its content!</h5>
        <div className="audioSource-container">
            <h6>Click here to upload a file</h6>
            <p className='addFile'><i class="bi bi-file-earmark-plus-fill"></i></p>
            <p>MP3, MP4, MPEG, MPGA, M4A, WAV, WEBM</p>
            <p>Max 25 MB</p>
        </div>
    </div>
    );
}
 
export default AudioSource;