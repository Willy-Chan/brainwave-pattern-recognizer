import React from 'react';
import { Navbar, Button, Alignment } from '@blueprintjs/core';
import LiveGraph from './LiveGraph';

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
    // ... add other data points as needed
];

const App: React.FC = () => (
    <div className="bp4-dark">
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Dallir</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home" text="Home" />
            <Button className="bp3-minimal" icon="document" text="Files" />
          </Navbar.Group>
        </Navbar>
        {dataPoints.map(point => (
            <LiveGraph key={point.label} dataIndex={point.index} label={point.label} />
        ))}
    </div>
);

export default App;
