import React, { useState, useEffect, } from 'react';
import ApiService from './apiServise';
import './DataBaseContent.css';
import InputContainer from '../InputContainer/InputContainer';

function DataBaseContent()
{
    const [items, setItems,] = useState([]);
    const apiService = new ApiService('http://192.168.0.156:8080');

    useEffect(() =>
    {
        updateItemList();
    }, []);

    const updateItemList = async () =>
    {
        try
        {
            const data = await apiService.getAllItems();
            setItems(data || []);
        }
        catch(error)
        {
            console.error('Error fetching data:', error);
        }
    };
    const handleDeleteItem = async (itemId) =>
    {
        try
        {
            await apiService.deleteItem(itemId);
            updateItemList();
        }
        catch(error)
        {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="data-container">
            <div className="items-container">
                {items.map((item) => (
                    <div key={item.id} className="item">
                        {item.item}
                        <div className="button-container">
                            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                            <button>2</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed-bottom-container">
                <InputContainer updateItemList={updateItemList} />
            </div>
        </div>
    );
}
export default DataBaseContent;
