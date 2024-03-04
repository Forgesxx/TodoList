import React, { useState, useEffect, } from 'react';
import ApiService from './apiServise';
import './DataBaseContent.css';

function DataBaseContent()
{
    const [items, setItems,] = useState([]);
    const apiService = new ApiService('');

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
        <div className="data-container">
            <div className="items-container">
                {items.map((item) => (
                    <div key={item.id} className="item">
                        {item.item}
                        <div className="button-container">
                            <button >1</button>
                            <button >2</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DataBaseContent;
