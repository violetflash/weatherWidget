import { useState } from 'react';

const UseCityId = () => {
    const [cityID, setCityID] = useState(null);

    return { cityID, setCityID };

};

export default UseCityId;