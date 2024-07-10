import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import './QCMType.css';
import { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { QuestionsContext } from '../context/QuestionsContext';


const QCMType = () => {
    const { currentLangData } = useContext(LangContext);
    const { questions } = useContext(QuestionsContext);

    return ( 
        <div className='listQuestionsQCM' > 
        <p className='titleList'> <i class="bi bi-list-check"></i> {currentLangData.mcqType.text}</p>
        {/*<div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>      
            <div className='responcesdiv'>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>A set of programming languages</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>{currentLangData.mcqType.description}</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>A set of guidelines for designing user interfaces</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
            </div>      
        </div>
        <hr></hr>
        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>      
            <div className='responcesdiv'>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>A set of programming languages</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>{currentLangData.mcqType.description}</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>A set of guidelines for designing user interfaces</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
            </div>      
        </div>
        <hr></hr>
        <div className='quizexemple'>
            <div className='quizdiv'>
            <p className='quiz'>What are the Solid Principles?</p>
            <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
            </div>      
            <div className='responcesdiv'>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>A set of programming languages</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>{currentLangData.mcqType.description}</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
                <div className="choicediv">
                    <FormCheckInput className="checkbox"></FormCheckInput>
                    <p  className='choice-content'>A set of guidelines for designing user interfaces</p>
                    <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                </div>
            </div>      
        </div>*/}

      {questions && questions.map((question, questionIndex) => (
        <div className='quizexemple' key={questionIndex}>
          <div className='quizdiv'>
            <p className='quiz'>{question.question}</p>
            <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
          </div>
          <div className='responcesdiv'>
            {question.choices.map((choice, choiceIndex) => (
              <div className="choicediv" key={choiceIndex}>
                <FormCheckInput className="checkbox"></FormCheckInput>
                <p className='choice-content'>{choice}</p>
                <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
        <hr></hr>
       
        <button className="add"> <i class="bi bi-plus-lg"></i>    {currentLangData.openQType.addQuestion}</button>
        <button className="more"> <i class="bi bi-arrow-clockwise"></i>   {currentLangData.openQType.generateMore}</button>

    </div>
    );
}
 
export default QCMType;
