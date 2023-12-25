import React, { useState } from 'react';
import { Card, Icon, IconName } from '@blueprintjs/core';
import './HomeScreen.css';
import Footer from './Footer';

interface CardData {
    id: number;
    title: string;
    content: string;
    icon: IconName; // Updated type
    selected: boolean;
}

const HomeScreen = () => {
    const initialCards: CardData[] = [
        { id: 1, title: "Device Setup", content: "Click here for instructions on how to setup your EEG.", icon: "signal-search", selected: false },
        { id: 2, title: "WebSocket Connection", content: "After your device is verified and working, connect it with the app.", icon: "link", selected: false },
        { id: 3, title: "Start Training", content: "Once connected, start training the EEG to recognize your thoughts!", icon: "predictive-analysis", selected: false },
    ];

    const [cards, setCards] = useState(initialCards);

    const handleCardClick = (cardId: number) => {
        // Show dialog (for simplicity, using alert)
        alert('Card clicked!');

        /////// Update the card's selected status
        const updatedCards = cards.map(card => {
            if (card.id === cardId) {
                return { ...card, selected: true };
            }
            return card;
        });

        if (cardId === 1) {
            console.log(1);
        };

        if (cardId === 2) {
            console.log(2);
        };

        if (cardId === 3) {
            console.log(3);
        };

        setCards(updatedCards);
        console.log(updatedCards)
    };

    return (
        <div className="homeScreen">
            <h1 className="asciiHeader">Vis Mentis</h1>
            <p className="subHeading">Telekinesis for your computer.</p>

            <div className="cardGridContainer">
                {cards.map(card => (
                    <Card key={card.id} interactive={true} compact={true} className='cardGridItem' onClick={() => handleCardClick(card.id)} selected={card.selected}>
                        <Icon icon={card.icon} iconSize={50} />
                        <h4>{card.title}</h4>
                        <p>{card.content}</p>
                    </Card>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default HomeScreen;
