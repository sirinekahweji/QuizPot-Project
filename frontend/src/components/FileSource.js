import React, { useContext,useState } from 'react';
import './FileSource.css';
import { LangContext } from '../context/LangContext';
import pdfToText from 'react-pdftotext'
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';




const FileSource = () => {

    const { currentLangData } = useContext(LangContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const { user } = useAuthContext();
    const { setQuestions } = useContext(QuestionsContext);
    const [paragraphs, setParagraphs] = useState([]);
    const [text, setText] = useState(null);

    function str2xml(str) {
        if (str.charCodeAt(0) === 65279) {
          str = str.substr(1);
        }
        return new DOMParser().parseFromString(str, "text/xml");
      }
      
      // Get paragraphs as javascript array
      function getParagraphs(content) {
        const zip = new PizZip(content);
        const xml = str2xml(zip.files["word/document.xml"].asText());
        const paragraphsXml = xml.getElementsByTagName("w:p");
        const paragraphs = [];
      
        for (let i = 0, len = paragraphsXml.length; i < len; i++) {
          let fullText = "";
          const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
          for (let j = 0, len2 = textsXml.length; j < len2; j++) {
            const textXml = textsXml[j];
            if (textXml.childNodes) {
              fullText += textXml.childNodes[0].nodeValue;
            }
          }
          if (fullText) {
            paragraphs.push(fullText);
          }
        }
        return paragraphs;
      }
    
    async function generate(event) {
        try {
          const text = await extractText(event);
          console.log(text);
          console.log("avant try");
      
          console.log("dans try");
          const response = await axios.post('http://localhost:5000/api/question/generateFromText', { text }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          });
      
          console.log('Response:', response.data);
          setQuestions(response.data.message);
        } catch (error) {
          console.error('Error generating questions:', error);
        }
      }
      
      // Extract text from PDF file
      function extractTextFromPdf(file) {
        return pdfToText(file)
          .then(text => {
            setText(text);
            return text;
          })
          .catch(error => {
            console.error("Failed to extract text from pdf", error);
            throw error;
          });
      }
      
 //extract text from dox file
    const extractTextFromDocx = (file) => {
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const content = e.target.result;
          const paragraphs = getParagraphs(content);
          setParagraphs(paragraphs);
          console.log('paragraphs',paragraphs)
        };
        console.log("erreur")

        reader.onerror = (err) => console.error(err);
    
        reader.readAsArrayBuffer(file);
      };
      function extractText(event) {
        const file = event.target.files[0];
        const fileType = file.type;

        switch (fileType) {
            case 'application/pdf':
                return extractTextFromPdf(file);
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/msword':
                return extractTextFromDocx(file);
            case 'text/plain':
                return extractTextFromTxt(file);
            default:
                return Promise.reject(new Error('Unsupported file type'));
        }
    }
    //extract text from textfile
      function extractTextFromTxt(file) {
        const reader = new FileReader();
    
        reader.onload = function(event) {
            const content = event.target.result;
            console.log("Contenu du fichier :", content);
        };
    
        reader.onerror = function(err) {
            console.error('Erreur de lecture du fichier :', err);
        };
    
        reader.readAsText(file);
    }

    return (
        <div className="filesource">
            <h5>{currentLangData.fileSource.title}</h5>
            <div className="fileSource-container">
                <h6>{currentLangData.fileSource.uploadPrompt}</h6>
                <label htmlFor="fileInput" className='addFile'>
                    <i className="bi bi-file-earmark-plus-fill"></i>
                </label>
               <input
                    id="fileInput"
                    type="file"
                    accept=".pdf, .doc, .docx, .txt" 
                    style={{ display: 'none' }}
                    onChange={generate}
                />
                <p>{currentLangData.fileSource.supportedFormats}</p>
                <p>{currentLangData.fileSource.maxSize}</p>
            </div>
        </div>
    );
}

export default FileSource;
