import React, {useContext} from 'react';
import classes from './InitialLoc.module.scss';
import styled from 'styled-components';
import icon from '../../icons/enter.svg';
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

const InitialLoc = props => {

    const {

        lsState: {setStoredValue},
        fdb,
        searchDropdownState: {dropdownList, setDropdownList},
        searchState: {inputValue, setInputValue},
        cityIDState: {cityID, setCityID}

    } = useContext(Context);


    const inputHandler = (e) => {
        setDropdownList([]);
        const dropdown = [];
        if (e.target.value) {
            const regExp = new RegExp(e.target.value.toLowerCase());
            if (fdb) {
                fdb.forEach(elem => {
                    if (regExp.test(elem.name.toLowerCase())) {

                        dropdown.push({city: elem.name, id: elem.id, country: elem.country});
                        setDropdownList(dropdown);
                    }
                });
            }
        }

        setInputValue(e.target.value);
    };

    const btnHandler = (e) => {
        e.preventDefault();
        setStoredValue(cityID);
        localStorage.setItem('city', JSON.stringify(cityID));
    };

    const dropdownBtnHandler = (e) => {
        e.preventDefault();
        setCityID(e.target.dataset.id);
        setInputValue(e.target.innerText);
        setDropdownList([]);
    };

    return (
        <>
            {fdb ? <span className={classes.Initial}>
                Add your location here:
                <form className={classes.Form}>
                    <div className={classes.Wrapper}>
                        <input
                            className={classes.Input}
                            type="text"
                            onChange={inputHandler}
                            value={inputValue}
                        />
                        <ul className={classes.Dropdown}>
                            {dropdownList.length < 30 && dropdownList.sort().map((item, index) => {
                                return (
                                    <li
                                        className={classes.Dropdown__item}
                                        key={item.id}
                                        onClick={dropdownBtnHandler}
                                        data-id={item.id}
                                    >
                                        <button className={classes.Dropdown__btn}>
                                            {item.city}, {item.country}
                                        </button>
                                    </li>
                                )
                            })}


                        </ul>
                    </div>
                    <Button className={classes.Button} onClick={btnHandler}/>
                </form>
            </span> :
                <Loader/>
            }
        </>
    );

};

export default InitialLoc;
