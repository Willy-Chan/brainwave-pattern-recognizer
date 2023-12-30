import React, { useState } from 'react';
import { Navbar, Button, Alignment, Drawer } from '@blueprintjs/core';
import LiveGraphScreen from './LiveGraphScreen';
import HomeScreen from './HomeScreen';
import Training from './Training';
import './App.css';

import '@blueprintjs/core/lib/css/blueprint.css';

const dataPoints = [
    { label: "Signal Strength", index: 0 },
    { label: "Attention", index: 1 },
    { label: "Meditation", index: 2 },
    { label: "Delta", index: 3 },
    { label: "Theta", index: 4 },
    { label: "Low Alpha", index: 5 },
    { label: "High Alpha", index: 6 },
    { label: "Low Beta", index: 7 },
    { label: "High Beta", index: 8 },
    { label: "Low Gamma", index: 9 },
    { label: "High Gamma", index: 10 },
];

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home'); // 'home', 'liveGraph', 'another'

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  return (
      <div className="bp4-dark">
          <Navbar>
              <Navbar.Group align={Alignment.LEFT}>
                  <Button className="bp3-minimal" icon="menu" onClick={handleDrawerOpen} />
                  <Navbar.Divider />
                  <Button className="bp3-minimal" icon="home" text="Home" onClick={() => setActiveScreen('home')} />
                  <Button className="bp3-minimal" icon="graph" text="Live Graph" onClick={() => setActiveScreen('liveGraph')} />
                  <Button className="bp3-minimal" icon="document" text="Another Screen" onClick={() => setActiveScreen('training')} />
              </Navbar.Group>
          </Navbar>
          <Drawer
              isOpen={isDrawerOpen}
              onClose={handleDrawerClose}
              title="Navigation"
              position='left'
          >
              <Button className="bp3-minimal" icon="home" text="Home" onClick={() => setActiveScreen('home')} />
              <Button className="bp3-minimal" icon="graph" text="Live Graph" onClick={() => setActiveScreen('liveGraph')} />
              <Button className="bp3-minimal" icon="document" text="Another Screen" onClick={() => setActiveScreen('training')} />
          </Drawer>
          
          {activeScreen === 'home' && <HomeScreen setActiveScreen={ setActiveScreen }/>}
          {activeScreen === 'liveGraph' && <LiveGraphScreen dataPoints={dataPoints}/>}
          {activeScreen === 'training' && <Training dataPoints={dataPoints}/>}

      </div>
  );
};

export default App;
