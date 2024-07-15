import React, { useContext, useState } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import './QCMType.css';
import axios from 'axios';
import { LangContext } from '../context/LangContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'; 
import { FormDataContext } from '../context/FormDataContext'; 
import { useAuthContext } from '../Hooks/useAuthContext';




const QCMType = ({ handleScoreUpdate }) => {


    const { currentLangData } = useContext(LangContext);
    const { questions , setQuestions} = useContext(QuestionsContext);
    const [selectedChoices, setSelectedChoices] = useState({});
    const { user } = useAuthContext();
    const { formData, setFormData } = useContext(FormDataContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     

    const sanitizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
    };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      
        const submitData = {
          ...formData,
          numQuestions: parseInt(formData.numQuestions),
        };
      
        try {
            console.log("submitData",submitData)
          const response = await axios.post('http://localhost:5000/api/question/generatemore', submitData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          });
          const newQuestions = response.data.message; // Assurez-vous que votre API renvoie les nouvelles questions dans cette propriété
          console.log('new questions:',newQuestions ); 

          setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);

        
          console.log('Questions:',questions ); 
        } catch (error) {

          console.error('Error generating new questions:', error);

        } finally {
          setLoading(false);
        }
      };


    const handleChoiceSelect = (questionIndex, choiceIndex, isCorrect) => {
        if (selectedChoices[questionIndex]) {
            return;
        }

        setSelectedChoices(prevState => ({
            ...prevState,
            [questionIndex]: {
                choiceIndex,
                isCorrect
            }
        }));

        if (isCorrect) {
            handleScoreUpdate(prevScore => prevScore + 1); 
        }
    };

    return (
        <div className='listQuestionsQCM'>
            <p className='titleList'><i className="bi bi-list-check"></i> {currentLangData.mcqType.text}</p>

            {questions && questions.map((question, questionIndex) => (
                <div className='quizexemple' key={questionIndex}>
                    <div className='quizdiv'>
                        <p className='quiz'>{question.question}</p>
                    </div>
                    <div className='responcesdiv'>
                        {question.choices.map((choice, choiceIndex) => {
                            const correctAnswer = sanitizeString(question.answer.split(') ')[1]); 
                            const isCorrect = correctAnswer === sanitizeString(choice);
                            ;
                            const isSelected = selectedChoices[questionIndex] && selectedChoices[questionIndex].choiceIndex === choiceIndex;
                            const icon = isSelected ? (selectedChoices[questionIndex].isCorrect ? <BiCheckCircle className="icon-correct" /> : <BiXCircle className="icon-incorrect" />) : null;

                            return (
                                <div className="choicediv" key={choiceIndex} onClick={() => handleChoiceSelect(questionIndex, choiceIndex, isCorrect)}>
                                    <div className="choice-wrapper">
                                        <FormCheckInput className="checkbox" checked={isSelected} readOnly />
                                    </div>
                                    <p className='choice-content'>{choice}</p>
                                    {icon}
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                </div>
            ))}
           
            <button className="more" onClick={handleSubmit} ><i className="bi bi-arrow-clockwise" ></i>{currentLangData.openQType.generateMore}</button>
        </div>
    );
};

export default QCMType;
