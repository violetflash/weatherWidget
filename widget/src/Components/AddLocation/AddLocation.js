import React, {useContext} from 'react';
import classes from './AddLocation.module.scss';
import styled from 'styled-components';
import icon from '../../icons/enter.svg';
import eraser from '../../icons/eraser.svg';
import Context from '../utils/Context';
import Loader from "../Loader/Loader";


const Button = styled.button`
  border: none;
  width: 40px;
  height: 100%;
  padding: 0;
  background-color: transparent;
  background-image: url(${icon});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: center;
  cursor: pointer;
  transform: translateY(0);
  transition: all 0.3s ease;
`;

const Eraser = styled.button`
  position: absolute;
  right: 5px;
  transform: translateY(50%);
  width: 16px;
  height: 16px;
  background-image: url(${eraser});
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const AddLocation = props => {

    const {

        lsState: { storedValue, setStoredValue },
        fdb,
        searchDropdownState: {dropdownList, setDropdownList},
        searchState: {inputValue, setInputValue},
        cityIDState: {cityID, setCityID},
        openSettingsState: { setOpenSettings }

    } = useContext(Context);


    const inputHandler = (e) => {
        setDropdownList([]);
        const dropdown = [];
        if (e.target.value) {
            const regExp = new RegExp(e.target.value.toLowerCase());
            if (fdb) {
                fdb.forEach(elem => {
                    if (regExp.test(elem.name.toLowerCase())) {
                        dropdown.push({city: elem.name, id: elem.id, country: elem.country, lat: elem.coord.lat, lon: elem.coord.lon});
                        setDropdownList(dropdown);
                    }
                });
            }
        }

        setInputValue(e.target.value);
    };

    const btnHandler = (e) => {
        e.preventDefault();
        setInputValue('');
        const newStoredValue = [...storedValue];
        const double = newStoredValue.findIndex(elem => elem.id === cityID.id);

        if (double >= 0) return;

        newStoredValue.push(cityID);
        setStoredValue(newStoredValue);
        localStorage.setItem('city', JSON.stringify(storedValue));
        setCityID(null);
        setOpenSettings(null);
    };

    const dropdownBtnHandler = (e) => {
        e.preventDefault();
        const target = e.target.closest(`.${classes.Dropdown__item}`).querySelector('button');
        setCityID({
            name: target.innerText,
            id: target.dataset.id,
            lat: target.dataset.lat,
            lon: target.dataset.lon,
        });
        setInputValue(target.innerText);
        setDropdownList([]);
    };

    const erase = () => {
        setInputValue('');
        setCityID(null);
    };

    return (
        <>
            {fdb ? <section className={classes.Search}>
                Add location:
                <form className={classes.Form}>
                    <div className={classes.Wrapper}>
                        {inputValue && <Eraser onClick={erase}/>}
                        <input
                            className={classes.Input}
                            type="text"
                            onChange={inputHandler}
                            value={inputValue}
                        />
                        <ul className={classes.Dropdown}>
                            {dropdownList.length < 100 && dropdownList.map((item, index) => {
                                return (
                                    <li
                                        className={classes.Dropdown__item}
                                        key={item.id}
                                        onClick={dropdownBtnHandler}
                                    >
                                        <button
                                            className={classes.Dropdown__btn}
                                            data-id={item.id}
                                            data-lat={item.lat}
                                            data-lon={item.lon}
                                        >
                                            {item.city}, {item.country}
                                        </button>
                                    </li>
                                )
                            })}


                        </ul>
                    </div>
                    <Button className={classes.Button} onClick={btnHandler} disabled={!cityID}/>
                </form>
            </section> :
                <Loader/>
            }
        </>
    );

};

export default AddLocation;
