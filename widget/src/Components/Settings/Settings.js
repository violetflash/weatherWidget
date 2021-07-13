import React, { useContext } from 'react';
import classes from './Settings.module.scss';
import styled from 'styled-components';
import close from '../../icons/close.svg';
import Context from "../utils/Context";
import AddLocation from "../AddLocation/AddLocation";
import DragNDrop from "../DragNDrop/DragNDrop";


const CloseButton = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 0;
  background-image: url(${close});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  cursor: pointer;
  transform: translateY(25%) rotate(0);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(25%) rotate(-90deg);
  }
`;



const Settings = () => {
    const {
        openSettingsState: {setOpenSettings},
    } = useContext(Context);

    const closeHandler = () => {
        setOpenSettings(null);
    };





    return (
        <section className={classes.Settings}>
            <CloseButton onClick={closeHandler}/>
            <h4 className={classes.Settings__title}>Settings</h4>
            <DragNDrop />

            <AddLocation/>
        </section>
    )

};

export default Settings;
