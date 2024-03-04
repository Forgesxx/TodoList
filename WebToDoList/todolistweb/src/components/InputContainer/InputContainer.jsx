import React, { useState, } from 'react';
import './inputContainer.css';
import ApiService from '../DataBaseContent/apiServise';

export default function InputContainer({ updateItemList, })
{
    const apiService = new ApiService('http://192.168.0.156:8080');
    const [inputText, setInputText,] = useState('');

    const handleAddButtonClick = async () =>
    {
        try
        {
            if (inputText.trim() === '')
            {
                alert('Enter text before sending');
                return;
            }

            await apiService.addItem(inputText);

            setInputText('');
            if (updateItemList)
            {
                updateItemList();
            }
        }
        catch(error)
        {
            console.error('Error when adding an item:', error);
        }
    };

    return (
        <div className='input-container'>
            <input
                className='text-input'
                placeholder='Enter text'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button className='action-button' onClick={handleAddButtonClick}>
        Add
            </button>
        </div>
    );
}
