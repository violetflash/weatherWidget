import { useState } from 'react';

const UseOpenSettings = () => {
    const [openSettings, setOpenSettings] = useState(null);

    return { openSettings, setOpenSettings };

};

export default UseOpenSettings;