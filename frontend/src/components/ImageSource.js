import React, { useContext, useState } from 'react';
import './ImageSource.css';
import { LangContext } from '../context/LangContext';
import Tesseract from 'tesseract.js';

const ImageSource = () => {
    const { currentLangData } = useContext(LangContext);
    const [recognizedText, setRecognizedText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null); // État pour stocker les erreurs
    const [progress, setProgress] = useState(0); // État pour la progression
    const [statusMessage, setStatusMessage] = useState(''); // État pour stocker le message de statut

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        TextRecognition(file);
    };

    const TextRecognition = async (file) => {
        try {
            if (file) {
                const { data } = await Tesseract.recognize(
                    file,
                    'eng', // Langue pour la reconnaissance (à ajuster selon vos besoins)
                    { 
                        logger: m => {
                            console.log(m); // Logger pour afficher les détails du processus
                            setProgress(m.progress); // Mettre à jour l'état de la progression
                            setStatusMessage(m.status); // Mettre à jour l'état du message de statut
                        }
                    }
                );
                setRecognizedText(data.text);
                setError(null); // Réinitialiser l'erreur en cas de succès
                setProgress(1); // Mettre à jour la progression à 100% après le succès
                setStatusMessage('Reconnaissance terminée'); // Mise à jour du message de statut
                console.log('Texte reconnu :', data.text);
            }
        } catch (err) {
            setError('Erreur lors de la reconnaissance du texte. Veuillez réessayer.'); // Définir un message d'erreur
            console.error('Erreur lors de la reconnaissance du texte :', err);
            setProgress(0); // Réinitialiser la progression en cas d'erreur
            setStatusMessage('Erreur lors de la reconnaissance'); // Mise à jour du message de statut
        }
    };

    return (
        <div className="imagesource">
            <h5>{currentLangData.imageSource.title}</h5>
            <div className="imageSource-container">
                <h6>{currentLangData.imageSource.uploadPrompt}</h6>
                <label htmlFor="fileInput" className='addFile'>
                    <i className="bi bi-file-earmark-plus-fill"></i>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <p>{currentLangData.imageSource.supportedFormats}</p>
            </div>
         
        </div>
    );
}

export default ImageSource;
