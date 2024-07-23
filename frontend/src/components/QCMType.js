import React, { useContext, useState } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import './QCMType.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LangContext } from '../context/LangContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'; 
import { FormDataContext } from '../context/FormDataContext'; 
import { useAuthContext } from '../Hooks/useAuthContext';
import questionsIcon from '../assets/questions.png';


const QCMType = ({ handleScoreUpdate }) => {
    const { currentLangData } = useContext(LangContext);
    const { questions, setQuestions } = useContext(QuestionsContext);
    const [selectedChoices, setSelectedChoices] = useState({});
    const { user } = useAuthContext();
    const { formData, setFormData } = useContext(FormDataContext);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);

    const [error, setError] = useState(null);
    const MySwal = withReactContent(Swal);

    
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
        MySwal.fire({
            title: 'Generating...',
            text: 'Please wait while we generate questions',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

        try {
            console.log("submitData", submitData)
            const response = await axios.post('http://localhost:5000/api/question/generatemore', submitData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const newQuestions = response.data.message; // Assurez-vous que votre API renvoie les nouvelles questions dans cette propriété
            console.log('new questions:', newQuestions); 

            setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);
            setLoading(false);


            console.log('Questions:', questions); 
            Swal.fire({
                icon: 'success',
                title: 'Generated',
                text: 'Your Questions has been generated successfully.',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error generating new questions:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to generate Questions. Please try again.',
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChoiceSelect = (questionIndex, choiceIndex, choiceLetter, correctAnswerLetter) => {
        if (selectedChoices[questionIndex]) {
            return;
        }

        const isCorrect = correctAnswerLetter.toLowerCase() === choiceLetter.toLowerCase();

        setSelectedChoices(prevState => ({
            ...prevState,
            [questionIndex]: {
                choiceIndex,
                isCorrect
            }
        }));

        if (isCorrect) {
            handleScoreUpdate(prevScore => prevScore + 1); 
            setScore(score + 1)

        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        let idform=0;
        try {
            //saveformresponses();
            //console.log("saveformresponses done ");
            try {
              const newformdata={
               ...formData,
               score: Math.round((score / questions.length) * 100)
              }
            console.log("form",formData);
               console.log(newformdata);
               const response = await axios.post('http://localhost:5000/api/responseForm/save',newformdata,{
                 headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.token}` 
                 }
               
               });
               console.log('formData saved successfully:', response.data);
   
               console.log("formResponseId:base de donner",response.data._id)
               //return response.data._id; 
               idform=response.data._id;
               console.log("idformvariable:",idform)
  
             } catch (error) {
               console.error('Error  save formData', error);
               setError('Failed to save formData. Please try again later.');
             }
  
  
          
             //savequestions();
            //console.log("savequestions done ");
            try {
              console.log("form id dans sabe questionsvariable",idform)
              console.log("questions a enregistrer ",questions);
                  if(idform!==0){
                   const response = await axios.post('http://localhost:5000/api/question/save-questions',{ questions,idform },{
                     headers: {
                       'Content-Type': 'application/json',
                       'Authorization': `Bearer ${user.token}` 
                     }
                   
                   });
                   console.log('Questions saved successfully:', response.data);
                   //return response.data;
               }
               else{
                 console.log("Error : form id is null")
       
               }
             
                 } catch (error){
                   console.error('Error  save questions', error);
                   setError('Failed to save questions. Please try again later.');
                 }
    
            Swal.fire({
                icon: 'success',
                title: 'Saved',
                text: 'Your Questions has been saved successfully.',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error saving data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save Questions. Please try again.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    };
    

    return (
        <div className='listQuestionsQCM'>
            <p className='titleList'>
            <img src={questionsIcon} className='QuestionsIcon' alt='questionsIcon' />
            Questions</p>

            {!questions && <div className='noQuestions'> No Questions Avaible ...<br></br>
                Fill the form and get your Questions</div>}
            

            {questions && questions.map((question, questionIndex) => (
                <div className='quizexemple' key={questionIndex}>
                    <div className='quizdiv'>
                        <p className='quiz'>{question.question}</p>
                    </div>
                    <div className='responcesdiv'>
                        {question.choices.map((choice, choiceIndex) => {
                            const choiceLetter = String.fromCharCode(65 + choiceIndex).toLowerCase(); // Convert index to letter (A, B, C, ...)
                            const correctAnswerLetter = question.answer.charAt(0).toLowerCase();
                            const isSelected = selectedChoices[questionIndex] && selectedChoices[questionIndex].choiceIndex === choiceIndex;
                            const icon = isSelected ? (selectedChoices[questionIndex].isCorrect ? <BiCheckCircle className="icon-correct" /> : <BiXCircle className="icon-incorrect" />) : null;

                            return (
                                <div className="choicediv" key={choiceIndex} onClick={() => handleChoiceSelect(questionIndex, choiceIndex, choiceLetter, correctAnswerLetter)}>
                                    <div className="choice-wrapper">
                                    <FormCheckInput className='checkbox' checked={isSelected} readOnly />
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
            {questions && 
            <div>
            <button className="more" onClick={handleSubmit}><i className="bi bi-arrow-clockwise"></i>{currentLangData.openQType.generateMore}</button>
            <button className='save' onClick={handleSave}>{currentLangData.questions.buttons.save} <i className="bi bi-chevron-right"></i></button>
             </div>}             
            </div>
    );
};

export default QCMType;
