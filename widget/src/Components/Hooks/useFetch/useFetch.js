import { useEffect, useState } from 'react';

const useFetch = (id, lat, lon, type) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const APIkey = 'e9bc19a6f7701bfb42833e22b1a7521a';
        const currentQuery = `//api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APIkey}`;
        const details = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${APIkey}`;
        const query = type ? currentQuery : details;

        const fetchData = async() => {
            try {
                const db = await fetch(query);
                const res = await db.json();
                setResponse(res);
            } catch(err) {
                setError(err);
            }
        }
        fetchData();
    }, [id, lat, lon, type]);

    return { response, error };
};

export default useFetch;
