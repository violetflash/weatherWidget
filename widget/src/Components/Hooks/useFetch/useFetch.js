import { useEffect, useState } from 'react';

const useFetch = (id) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const APIkey = 'e9bc19a6f7701bfb42833e22b1a7521a';
        const query = `//api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APIkey}`;

        console.log(query);
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
    }, [id]);

    return { response, error };
};

export default useFetch;
