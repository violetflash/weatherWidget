import React from 'react';
import classes from './InitialLoc.module.scss';

const InitialLoc = props => {
    return (
        <span className={classes.Initial}>
            Add your location here:
            <label className={classes.Label}>
                <input className={classes.Input} type="text"/>
                <button className={classes.Button}/>
            </label>
        </span>
    );

};

export default InitialLoc;
