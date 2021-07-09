import { useState } from 'react';

const UseSearchInputValue = () => {
    const [inputValue, setInputValue] = useState('');

    return { inputValue, setInputValue };
};

export default UseSearchInputValue;