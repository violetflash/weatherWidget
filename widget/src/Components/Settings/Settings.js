import React, { useContext } from 'react';
import classes from './Settings.module.scss';
import styled from 'styled-components';
import close from '../../icons/close.svg';
import Context from "../utils/Context";


const Button = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 0;
  background-image:url(${close});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
  transform: rotate(0);
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(-90deg);
  }
`;


const Settings = props => {
    const { openSettingsState: { setOpenSettings } } = useContext(Context);

    const closeHandler = () => {
        setOpenSettings(null);
    };

    return (
        <section className={classes.Settings}>
            <Button onClick={closeHandler}/>
        </section>
    )

};

export default Settings;