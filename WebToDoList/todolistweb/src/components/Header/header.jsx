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
    }, []);

    return (
        <div>
            <span>{currentTime.toLocaleTimeString()}</span>
        </div>
    );
}
