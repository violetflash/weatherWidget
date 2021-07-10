import React from 'react';
import classes from './Settings.module.scss';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;


`;

const Settings = props => {

    return (
        <div className={classes.Settings}>
            <Button/>
        </div>
    )

};

export default Settings;