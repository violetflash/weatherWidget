import React, { useContext } from 'react';
import styled from "styled-components";
import Context from '../utils/Context';
import WeatherItem from "../WeatherItem/WeatherItem";
import classes from './Weather.module.scss';
import gear from './../../icons/settings.svg';

const Button = styled.button`
  position: absolute;
  padding: 0;
  width: 20px;
  height: 20px;
  right: 0;
  border: none;
  background-image:url(${gear});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transform: rotate(0);
  transition: all 0.3s ease;


  &:hover {
    transform: rotate(-90deg);
  }
`;

const Weather = props => {
    const {
        lsState: { storedValue }
    } = useContext(Context);

    return (
        <section className={classes.Weather}>
            <Button />
            {storedValue.map(id => <WeatherItem key={id} id={id}/>)}
        </section>
    )

};

export default Weather;