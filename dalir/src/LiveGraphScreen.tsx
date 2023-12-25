import React from 'react';
import LiveGraph from './LiveGraph';

interface DataPoint {
    label: string;
    index: number;
}

interface LiveGraphScreenProps {
    dataPoints: DataPoint[];
}

const LiveGraphScreen: React.FC<LiveGraphScreenProps> = ({ dataPoints }) => (
    <div className="graph-container">
        {dataPoints.map(point => (
            <LiveGraph key={point.label} dataIndex={point.index} label={point.label} />
        ))}
    </div>
);

export default LiveGraphScreen;
