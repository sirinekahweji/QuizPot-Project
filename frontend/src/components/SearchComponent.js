import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import './SearchComponent.css';
import { LangContext } from '../context/LangContext';

const SearchComponent = () => {
    const { currentLangData } = useContext(LangContext);

    const [inputVisible, setInputVisible] = useState(false);
    const [counter, setCounter] = useState(0);
    const bubblesRef = useRef([]);
    const colors =['#1CAF60','#4C83F0' ,'#EEB80B','purple','#1CAF60','#4C83F0' ,'#EEB80B','#f34079']

    const bubbling = useCallback(() => {
        if (counter < bubblesRef.current.length) {
            setTimeout(() => {
                bubblesRef.current[counter].classList.add('animate');
                setCounter(counter + 1);
            }, 80);
        }
    }, [counter]);

    useEffect(() => {
        bubbling();
    }, [counter, bubbling]);

    const handleMouseOver = () => {
        bubblesRef.current[0].style = 'width: 350px; border-radius: 10px;  z-index: 1;';
        bubblesRef.current[0].classList.remove('animate');
        setInputVisible(true);
    };

    const handleMouseOut = () => {
        bubblesRef.current[0].style = '';
        bubblesRef.current[0].classList.add('animate');
        setInputVisible(false);
    };

    const searchLetters = currentLangData.searchLetters;

    return (
        <div className="search-container">
            <div 
                className="search-wrapper" 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut}
            >
                <div id="searchBox">
                    <div className="bubble" ref={el => bubblesRef.current[0] = el}>
                        {inputVisible ? 
                            <input 
                                type="text" 
                                className="inputSearch" 
                                placeholder={currentLangData.search}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        console.log('Now I am removing text but you can do whatever you want with text value 😊');
                                        e.target.value = '';
                                    }
                                }}
                            /> 
                            : 
                            <p className="S" style={{ color: 'red' }}>{searchLetters[0]}</p>
                        }
                    </div>
                    {searchLetters.slice(1).map((letter, index) => (
                        <div 
                            className="bubble" 
                            style={{ left: `${(index + 1) * 50}px` }} 
                            ref={el => bubblesRef.current[index + 1] = el} 
                            key={index}
                        >
                            <p style={{ color:colors[index]  }}>{letter}</p>
                        </div>
                    ))}
                    <div className="bubble" style={{ left: `${searchLetters.length * 50}px` }} ref={el => bubblesRef.current[searchLetters.length] = el}><p>🔎</p></div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default SearchComponent;
