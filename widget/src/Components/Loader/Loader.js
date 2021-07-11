import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => {
    return (
        <>
            <span className={classes.Loader}>
                <p className={classes.Loader__text} />
            </span>
        </>
    )

};

export default Loader;