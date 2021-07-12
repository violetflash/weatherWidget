import React, { useContext } from 'react';
import classes from './Settings.module.scss';
import styled from 'styled-components';
import close from '../../icons/close.svg';
import Context from "../utils/Context";
import AddLocation from "../AddLocation/AddLocation";
import trash from '../../icons/trash.svg';


const CloseButton = styled.button`
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
  transform: translateY(25%) rotate(0) ;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(25%) rotate(-90deg) ;
  }
`;

const DeleteButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  background-color: inherit;
  background-image:url(${trash});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;


const Settings = props => {
    const {
        openSettingsState: { setOpenSettings },
        lsState: { storedValue, setStoredValue }
    } = useContext(Context);

    const closeHandler = () => {
        setOpenSettings(null);
    };

    const deleteCity = (index) => {
        const newStoredValue = [...storedValue];
        newStoredValue.splice(index, 1);
        setStoredValue(newStoredValue);
    };

    return (
        <section className={classes.Settings}>
            <CloseButton onClick={closeHandler}/>
            <h4 className={classes.Settings__title}>Settings</h4>
            {storedValue.map((city, index) => {
                return (
                    <div className={classes.Settings__city} key={city.id} draggable="true">
                        <div className={classes.Settings__burger}>
                            <span />
                            <span />
                            <span />
                        </div>
                        <div className={classes.Settings__cityName}>{city.name}</div>
                        <DeleteButton onClick={() => deleteCity(index)}/>
                    </div>
                )
            })}
            <AddLocation />
        </section>
    )

};

export default Settings;
