import React from 'react';
import logoImg from '../assets/quiz-logo.png'

const Header = () => {
    return (
        <header>
            <img src={logoImg} alt="Quiz Logo" />
            <h1>Quiz app</h1>
        </header>
    );
};

export default Header;