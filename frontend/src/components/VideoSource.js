import './VideoSource.css'; 
const VideoSource = () => {
    return ( 
        <div className="videoSource">
            <h5>Give Quizbot a link to a YouTube video, and it will create questions about its content!</h5>
             <input placeholder="https://www.youtub.com" className="videoSource-container"></input>

        </div>
     );
}
 
export default VideoSource;