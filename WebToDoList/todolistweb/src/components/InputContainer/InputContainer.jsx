import React from 'react';
import './inputContainer.css';

export default function InputContainer()
{
    return (
        <div className='input-container'>
            <input className='text-input' placeholder='Enter text'></input>
            <button className='action-button'>Add</button>
        </div>
    );
}
