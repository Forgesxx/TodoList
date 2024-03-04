import React, { useState, useEffect, } from 'react';
import ApiService from './apiServise';

function DataBaseContent()
{
    const [items, setItems,] = useState([]);
    const apiService = new ApiService('http://192.168.0.156:8080');

    useEffect(() =>
    {
        apiService.getAllItems()
            .then((data) => setItems(data || []))
            .catch((error) =>
            {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div>
                {items.map((item) => (
                    <div key={item.id}>{item.item}</div>
                ))}
            </div>
        </div>
    );
}

export default DataBaseContent;
