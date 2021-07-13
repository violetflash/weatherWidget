import React from 'react';
import classes from './Loader.module.scss';

const Loader = ({text}) => {
    return (
        <>
            <span className={classes.Loader}>
                <p className={classes.Loader__text} >{text}</p>
            </span>
        </>
    )

};

export default Loader;