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
    
      {questions && questions.map((question, questionIndex) => (
        <div className='quizexemple' key={questionIndex}>
          <div className='quizdiv'>
            <p className='quiz'>{question.question}</p>
          </div>
          <div className='responcesdiv'>
            {question.choices.map((choice, choiceIndex) => (
              <div className="choicediv" key={choiceIndex}>
                <FormCheckInput className="checkbox"></FormCheckInput>
                <p className='choice-content'>{choice}</p>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
        <button className="more"> <i class="bi bi-arrow-clockwise"></i>   {currentLangData.openQType.generateMore}</button>

    </div>
    );
}
 
export default QCMType;
