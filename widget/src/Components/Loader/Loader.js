import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => {
    return (
        <>
            <span className={classes.Loader}/>
            <p>Loading cities...</p>
        </>
    )

};

export default Loader;