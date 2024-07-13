import React, { useContext,useState } from 'react';
import './FileSource.css';
import { LangContext } from '../context/LangContext';
import {getDocument} from 'pdfjs-dist';
import mammoth from 'mammoth';
import pdfToText from 'react-pdftotext'
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";



const FileSource = () => {

    const { currentLangData } = useContext(LangContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [paragraphs, setParagraphs] = useState([]);
    function str2xml(str) {
        if (str.charCodeAt(0) === 65279) {
          // BOM sequence
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
    

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }


        try {
            let extractedText = '';
            if (selectedFile.type === 'application/pdf') {
                extractedText = await extractTextFromPDF(selectedFile);
            } else if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                extractedText = await extractTextFromDOCX(selectedFile);
            } else if (selectedFile.type === 'text/plain') {
                extractedText = await extractTextFromPlainText(selectedFile);
            } else {
                alert('Unsupported file format.');
                return;
            }

            console.log('Extracted Text:', extractedText);

            // Now you can send `extractedText` to the backend for further processing
            // Example: Send to backend using Axios
            // await axios.post('http://localhost:5000/process-text', { text: extractedText });

        } catch (error) {
            console.error('Error extracting text:', error);
            alert('Error extracting text. Please try again.');
        }
    };

    const extractTextFromPDF = async (file) => {
        try {
          const arrayBuffer = await fileToBuffer(file);
          const pdf = await getDocument({ data: arrayBuffer }).promise;
          let text = '';
         console.log('nbp:',pdf.numPages)
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);

            const textContent = await page.getTextContent();
            console.log('textContent:',textContent)

            const items = textContent.items;
            for (let i = 0; i < items.length; i++) {
              text += items[i].str + '';
            }
          }
      
          return text.trim();
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
          throw error;
        }
      };
      
      const fileToBuffer = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsArrayBuffer(file);
        });
      };

    const extractTextFromDOCX = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
                    resolve(result.value);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const extractTextFromPlainText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                resolve(text);
            };
            reader.readAsText(file);
        });
    };
//extract file from pdf file
    function extractText(event) {
        const file = event.target.files[0]
        pdfToText(file)
            .then(text => console.log(text))
            .catch(error => console.error("Failed to extract text from pdf"))
    }

 //extract text from dex file
    const textFromDoxFile = (event) => {
        const reader = new FileReader();
        let file = event.target.files[0];
    
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
    //extract text from textfile
      function textFromTextFile(event) {
        const file = event.target.files[0];
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

    //extract text from pptx

    const extractTextFromPPTX = (file) => {

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const arrayBuffer = event.target.result;
                const zip = new PizZip(arrayBuffer);
                const content = zip.files["ppt/slides/slide1.xml"].asText(); // Exemple de chemin, ajustez selon la structure de votre fichier .pptx
                const xmlDoc = new DOMParser().parseFromString(content, "text/xml");
                const textElements = xmlDoc.getElementsByTagName("a:t");
                const texts = [];

                for (let i = 0; i < textElements.length; i++) {
                    texts.push(textElements[i].textContent);
                }

                console.log('Textes extraits :', texts);
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Erreur lors de l\'extraction du texte depuis le PPTX :', error);
        }
    };
    const textFrompptx = (event) => {
        const file = event.target.files[0];
        extractTextFromPPTX(file);
    };
    

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
                    style={{ display: 'none' }}
                    onChange={textFrompptx}
                />
                <p>{currentLangData.fileSource.supportedFormats}</p>
                <p>{currentLangData.fileSource.maxSize}</p>
            </div>
        </div>
    );
}

export default FileSource;
