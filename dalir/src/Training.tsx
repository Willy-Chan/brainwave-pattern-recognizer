import React, { useState, useEffect } from 'react';
import { Button, Card, Icon } from '@blueprintjs/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './Training.css';

interface EEGData {
    timestamp: number;
    values: number[];
}

interface DataPoint {
    label: string;
    index: number;
}

interface LiveGraphScreenProps {
    dataPoints: DataPoint[];
}


const Training: React.FC<LiveGraphScreenProps> = ({ dataPoints }) => {
    const [data, setData] = useState<EEGData[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const mockValues = Array.from({ length: 10 }, () => Math.random() * 100); // Simulating 10 different metrics
            const newData: EEGData = { timestamp: Date.now(), values: mockValues };

            setData(currentData => [...currentData.slice(-5), newData]);
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup the interval on unmount
    }, []);

    return (
        <div>
            <h3 className='graphLabel'>Live EEG Data</h3>
            <div className='bigGraph'>
                <LineChart width={1000} height={350} data={data}>
                    <XAxis dataKey="timestamp" tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Line key={index} type="monotone" dataKey={`values[${index}]`} stroke={`hsl(${index * 36}, 70%, 50%)`} />
                    ))}
                </LineChart>
            </div>
            <div className="cardGridContainer">
                <Card interactive={true} compact={true} className='cardGridItem'>
                    <h4>Action</h4>
                    <p>Description</p>
                </Card>
                <Card interactive={true} compact={true} className='cardGridItem'>
                    <h4>Action</h4>
                    <p>Description</p>
                </Card>
                <Card interactive={true} compact={true} className='cardGridItem'>
                    <h4>Action</h4>
                    <p>Description</p>
                </Card>
                <Card interactive={true} compact={true} className='cardGridItem'>
                    <h4>Action</h4>
                    <p>Description</p>
                </Card>
                <Card interactive={true} compact={true} className='cardGridItem'>
                    <h4>Action</h4>
                    <p>Description</p>
                </Card>
                <Card interactive={true} compact={true} className='cardGridItem'>
                    <h4>Action</h4>
                    <p>Description</p>
                </Card>
            </div>
        </div>
    );
};

export default Training;
