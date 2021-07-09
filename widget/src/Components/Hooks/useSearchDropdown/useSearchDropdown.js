import { useState } from 'react';

const UseSearchDropdown = () => {
    const [dropdownList, setDropdownList] = useState([]);

    return { dropdownList, setDropdownList };

};

export default UseSearchDropdown;