import React from 'react';

import css from './Footer.module.css';


const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.year}>{new Date().getFullYear()}</div>
        </footer>
    );
};

export {Footer};
