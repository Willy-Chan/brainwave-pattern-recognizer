import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface EEGData {
    timestamp: number;
    values: number[];
}

interface LiveGraphProps {
    dataIndex: number;
    label: string;
}

const LiveGraph: React.FC<LiveGraphProps> = ({ dataIndex, label }) => {
    const [data, setData] = useState<EEGData[]>([]);

    function connect() {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

        ws.onclose = (e) => {
            console.log('WebSocket closed. Reconnecting...', e.reason);
            setTimeout(() => connect(), 2000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
        };

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data).map(Number);
            const newData: EEGData = { timestamp: Date.now(), values: receivedData };

            setData(currentData => {
                const newDataArray = [...currentData, newData];
                return newDataArray.slice(-5); // Keep only the latest 5 data points
            });
        };
    }

    useEffect(() => {
        connect();
        return () => { /* WebSocket closing logic */ };
    }, []);

    return (
        <div>
            <h3>{label}</h3>
            <LineChart width={600} height={300} data={data.map(d => ({ timestamp: d.timestamp, value: d.values[dataIndex] }))}>
                <XAxis dataKey="timestamp" tickFormatter={(timestamp) => {
                    const date = new Date(timestamp);
                    return isNaN(date.getTime()) ? '' : date.toLocaleTimeString();
                }} />
                <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip 
                    formatter={(value, name) => [`${value}`, 'VALUE']} 
                    labelFormatter={(label) => [
                        'Timestamp: ', `${new Date(label).toLocaleTimeString()}`
                    ]} 
                />
                <Line type="monotone" dataKey="value" stroke="#8884d8" 
                    animationDuration={300}
                    animationEasing="ease-in-out"
                />
            </LineChart>
        </div>
    );
};

export default LiveGraph;
