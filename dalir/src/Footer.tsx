import React from 'react';
import { Icon } from '@blueprintjs/core';
import './Footer.css'; // Make sure to create this CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <Icon icon="globe-network" iconSize={50} />
                    <a href="#">
                        <h1>Contribute!</h1>
                    </a>
                </div>
                <div className="footer-section links">
                    <a href="#"> 
                        About
                    </a>
                    <a href="#">
                        License
                    </a>
                    <a href="#">
                        Other Projects
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
