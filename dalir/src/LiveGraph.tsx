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

    useEffect(() => {
        const intervalId = setInterval(() => {
            const mockValue = Math.random() * 100; // Generate a random value
            const newData: EEGData = { timestamp: Date.now(), values: Array(10).fill(mockValue) };

            setData(currentData => {
                const newDataArray = [...currentData, newData];
                return newDataArray.slice(-5); // Keep only the latest 5 data points
            });
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, []);

    return (
        <div>
            <h3 className='graphLabel'>{label}</h3>
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
