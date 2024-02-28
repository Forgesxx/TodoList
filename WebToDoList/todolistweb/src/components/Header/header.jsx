import { useEffect, useState, } from 'react';

export default function Header()
{
    const [currentTime, setNow,] = useState(new Date());

    useEffect(() =>
    {
        const intervalId = setInterval(() => setNow(new Date()), 1000);
        return () =>
        {
            clearInterval(intervalId);
        };
    }, []); // Make sure to include an empty dependency array to run the effect only once on mount

    return (
        <div>
            <span>Time now: {currentTime.toLocaleTimeString()}</span>
        </div>
    );
}
