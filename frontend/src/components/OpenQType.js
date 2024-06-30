import './OpenQType.css'; 

const OpenQType = () => {
    return ( 
        <div className='listQuestions' > 
        <p className='titleList'><i className="bi bi-chat-square-fill"></i> Open Questions</p>
        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>      
            <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
        </div>
        <hr></hr>
        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>      
            <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
        </div>
        <hr></hr>

        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>     
            <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
        </div>
        <hr></hr>
        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>     
            <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
        </div>
        <hr></hr>
        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>     
            <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
        </div>
        <button className="add"> <i class="bi bi-plus-lg"></i>    Add a question manually</button>
        <button className="more"> <i class="bi bi-arrow-clockwise"></i>   Generate more content on the same sectionAdd a question manually</button>

    </div>
    );
}
 
export default OpenQType;