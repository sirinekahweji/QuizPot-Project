import React, { useContext, useState } from 'react';
import './FileSource.css';
import { LangContext } from '../context/LangContext';
import pdfToText from 'react-pdftotext';
import PizZip from 'pizzip';
import { DOMParser } from '@xmldom/xmldom';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';

const FileSource = () => {
  const { currentLangData } = useContext(LangContext);
  const { user } = useAuthContext();
  const { setQuestions } = useContext(QuestionsContext);
  const [paragraphs, setParagraphs] = useState([]);
  const [text, setText] = useState(null);

  function str2xml(str) {
    if (str.charCodeAt(0) === 65279) {
      str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, 'text/xml');
  }

  function getParagraphs(content) {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files['word/document.xml'].asText());
    const paragraphsXml = xml.getElementsByTagName('w:p');
    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = '';
      const textsXml = paragraphsXml[i].getElementsByTagName('w:t');
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
      console.log('Text:', text);

      const response = await axios.post(
        'http://localhost:5000/api/question/generateFromText',
        { text },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        }
      );

      console.log('Response:', response.data);
      setQuestions(response.data.message);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  }

  function extractTextFromPdf(file) {
    return pdfToText(file)
      .then(text => {
        setText(text);
        return text;
      })
      .catch(error => {
        console.error('Failed to extract text from PDF', error);
        throw error;
      });
  }

  function extractTextFromDocx(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const paragraphs = getParagraphs(content);
        setParagraphs(paragraphs);
        console.log('Paragraphs:', paragraphs);
        resolve(paragraphs.join(' '));
      };

      reader.onerror = (err) => {
        console.error('Error reading DOCX file:', err);
        reject(err);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  function extractTextFromTxt(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        console.log('File content:', content);
        resolve(content);
      };

      reader.onerror = (err) => {
        console.error('Error reading text file:', err);
        reject(err);
      };

      reader.readAsText(file);
    });
  }

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

  return (
    <div className="filesource">
      <h5>{currentLangData.fileSource.title}</h5>
      <div className="fileSource-container">
        <h6>{currentLangData.fileSource.uploadPrompt}</h6>
        <label htmlFor="fileInput" className="addFile">
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
};

export default FileSource;
