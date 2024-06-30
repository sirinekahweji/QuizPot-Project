import React, { useState, useEffect, useRef } from 'react';
import './SearchComponent.css';

const SearchComponent = () => {
    const [inputVisible, setInputVisible] = useState(false);
    const [counter, setCounter] = useState(0);
    const bubblesRef = useRef([]);

    useEffect(() => {
        bubbling();
    }, [counter]);

    const bubbling = () => {
        if (counter < bubblesRef.current.length) {
            setTimeout(() => {
                bubblesRef.current[counter].classList.add('animate');
                setCounter(counter + 1);
            }, 80);
        }
    };

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

    return (
        <div className="container">
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
                                placeholder=" type something..." 
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        console.log('Now I am removing text but you can do whatever you want with text value 😊');
                                        e.target.value = '';
                                    }
                                }}
                            /> 
                            : 
                            <p className="S" style={{ color: '#4C83F0' }}>S</p>
                        }
                    </div>
                    <div className="bubble" style={{ left: '50px' }} ref={el => bubblesRef.current[1] = el}><p style={{ color: ' #f34079' }}>E</p></div>
                    <div className="bubble" style={{ left: '100px' }} ref={el => bubblesRef.current[2] = el}><p style={{ color: '#EEB80B' }}>A</p></div>
                    <div className="bubble" style={{ left: '150px' }} ref={el => bubblesRef.current[3] = el}><p style={{ color: '#4C83F0' }}>R</p></div>
                    <div className="bubble" style={{ left: '200px' }} ref={el => bubblesRef.current[4] = el}><p style={{ color: '#1CAF60' }}>C</p></div>
                    <div className="bubble" style={{ left: '250px' }} ref={el => bubblesRef.current[5] = el}><p style={{ color: '#f34079' }}>H</p></div>
                    <div className="bubble" style={{ left: '300px' }} ref={el => bubblesRef.current[6] = el}><p>🔎</p></div>
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
