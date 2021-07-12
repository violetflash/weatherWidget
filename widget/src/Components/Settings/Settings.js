import React, { useContext, useState } from 'react';
import classes from './Settings.module.scss';
import styled from 'styled-components';
import close from '../../icons/close.svg';
import burger from '../../icons/menu.svg';
import Context from "../utils/Context";
import AddLocation from "../AddLocation/AddLocation";
import trash from '../../icons/trash.svg';


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

const DeleteButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  background-color: inherit;
  background-image: url(${trash});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const Burger = styled.div`
  width: 16px;
  height: 16px;
  background-color: inherit;
  background-image: url(${burger});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;


const Settings = props => {
    const {
        openSettingsState: {setOpenSettings},
        lsState: {storedValue, setStoredValue},
        burgerState: { isBurgerDrag, setBurgerDrag }
    } = useContext(Context);

    const closeHandler = () => {
        setOpenSettings(null);
    };

    const deleteCity = (index) => {
        const newStoredValue = [...storedValue];
        newStoredValue.splice(index, 1);
        setStoredValue(newStoredValue);
    };

    const [currentCity, setCurrentCity] = useState(null);

    const burgerDragStartHandler = () => {
        setBurgerDrag(true);
    };

    function dragStartHandler(e, card) {
        setCurrentCity(card);
        console.log(currentCity);
        // console.log(storedValue);
    }

    function dragLeaveHandler(e) {
        // e.target.closest(`.${classes.Settings__city}`).classList.remove(`${classes.active}`);

    }

    function dragEndHandler(e) {
        setBurgerDrag(null);
        e.target.closest(`.${classes.Settings__city}`).classList.remove(`${classes.active}`);
        // e.target.style.borderStyle = 'solid';

    }

    function dragOverHandler(e) {
        e.preventDefault();
        e.target.closest(`.${classes.Settings__city}`).classList.add(`${classes.active}`);
        // e.target.style.borderStyle = 'dashed';
    }

    function dragDropHandler(e, card) {
        e.preventDefault();
        setStoredValue(storedValue.map((item) => {
            if (item.id === card.id) {
                return {...item, order: currentCity.order}
            }

            if (item.id === currentCity.id) {
                return {...item, order: card.order}
            }

            return item;
        }));
        e.target.closest(`.${classes.Settings__city}`).classList.add(`${classes.active}`);



        // console.log(storedValue);
    }

    const sortCards = (a, b) => {
        if (a.order > b.order) {
            return 1;
        } else return -1;
    };

    return (
        <section className={classes.Settings}>
            <CloseButton onClick={closeHandler}/>
            <h4 className={classes.Settings__title}>Settings</h4>
            {storedValue.sort(sortCards).map((city, index) => {
                return (
                    <div className={classes.Settings__city}
                         key={city.id}
                         draggable={!!isBurgerDrag}
                         onDragStart={(e) => dragStartHandler(e, city)}
                         onDragLeave={(e) => dragLeaveHandler(e)}
                         onDragEnd={(e) => dragEndHandler(e)}
                         onDragOver={(e) => dragOverHandler(e)}
                         onDrop={(e) => dragDropHandler(e, city)}
                    >
                        <Burger className={classes.Settings__burger} onMouseDown={burgerDragStartHandler} />
                        <div className={classes.Settings__cityName}>{city.name}</div>
                        <DeleteButton onClick={() => deleteCity(index)}/>
                    </div>
                )
            })}
            <AddLocation/>
        </section>
    )

};

export default Settings;