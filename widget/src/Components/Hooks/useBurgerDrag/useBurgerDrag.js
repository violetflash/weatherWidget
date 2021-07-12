import { useState } from 'react';

const UseBurgerDrag = () => {
    const [isBurgerDrag, setBurgerDrag] = useState(null);

    return { isBurgerDrag, setBurgerDrag };

};

export default UseBurgerDrag;