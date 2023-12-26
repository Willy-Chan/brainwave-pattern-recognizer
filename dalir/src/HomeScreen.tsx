import React, { useState } from 'react';
import { Card, Icon, IconName, Drawer, Spinner, Button, Dialog } from '@blueprintjs/core';
import './HomeScreen.css';
import Footer from './Footer';
import { useEffect } from 'react';

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
        { id: 2, title: "WebSocket Connection", content: "After your device is verified and working, verify that it's logging data.", icon: "link", selected: false },
        { id: 3, title: "Start Training", content: "Once connected, start training the EEG to recognize your thoughts!", icon: "predictive-analysis", selected: false },
    ];

    const [cards, setCards] = useState(initialCards);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [receivedData, setReceivedData] = useState("");
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [wsData, setWsData] = useState("");
    const [isWsConnected, setIsWsConnected] = useState(false);


    const connectWebSocket = () => {
        const newWs = new WebSocket('ws://localhost:3001');

        newWs.onopen = () => {
            console.log('Connected to WebSocket');
            setIsWsConnected(true);
        };

        newWs.onclose = () => {
            console.log('WebSocket connection closed. Attempting to reconnect...');
            setIsWsConnected(false);
            setTimeout(() => {
                connectWebSocket();
            }, 3000); // Reconnect after 3 seconds
        };

        newWs.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    
        setWs(newWs);
    };    

    useEffect(() => {
        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);


    const checkEEGConnection = async () => {
        setIsLoading(true);
        setConnectionStatus("");
        try {
            const response = await fetch('http://localhost:3001/check-eeg');
            const message = await response.text();
            setConnectionStatus(message);
            /////// Update the card's selected status
            const updatedCards = cards.map(card => {
                if (card.id === 1) {
                    return { ...card, selected: true };
                }
                return card;
            });
            setCards(updatedCards);
        } catch (error) {
            setConnectionStatus("Error connecting to EEG");
        }
        setIsLoading(false);
    };

    const handleCardClick = (cardId: number) => {
        if (cardId === 1) {
            setIsDrawerOpen(true);
            checkEEGConnection();
        }

        if (cardId === 2 && isWsConnected === true) {
            setIsDialogOpen(true);
            const updatedCards = cards.map(card => {
                if (card.id === 2) {
                    return { ...card, selected: true };
                }
                return card;
            });
            setCards(updatedCards);
        };

        if (cardId === 3) {
            console.log(3);
        };
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
            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="EEG Connection"
            >
                <div>
                    {connectionStatus === "EEG already connected" ? 
                        <Icon className="spinnerSuccess" icon="tick-circle" iconSize={50} intent="success" /> :
                        <Spinner className="spinnerLoad" size={50} />
                    }
                    <p className="drawerText">{connectionStatus || "Checking for EEG device..."}</p>
                </div>
                <div className="drawerButtons">
                    <Button 
                        text="Try Again" 
                        onClick={checkEEGConnection} 
                        disabled={isLoading || connectionStatus === "EEG already connected" } 
                        className="bp3-minimal"
                    />
                    <Button 
                        text="Continue" 
                        onClick={() => {setIsDrawerOpen(false)}} 
                        disabled={isLoading || connectionStatus === "Trying to connect EEG"} 
                        intent="success"
                    />
                </div>
            </Drawer>
            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="WebSocket Connection Status"
            >
                <div>
                    {isWsConnected ? 
                        <Icon className="spinnerSuccess" icon="tick-circle" iconSize={50} intent="success" /> :
                        <Spinner className="spinnerLoad" size={50} />
                    }
                    <p className='popupText'>{isWsConnected ? "WebSocket is connected." : "Connecting to WebSocket..."}</p>
                </div>
                <div>
                    <Button text="Close" onClick={() => setIsDialogOpen(false)} />
                </div>
            </Dialog>



            <Footer />
        </div>
    );
};

export default HomeScreen;
