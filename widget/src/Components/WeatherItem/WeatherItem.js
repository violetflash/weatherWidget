import React from 'react';
import useFetch from "../Hooks/useFetch/useFetch";
import Loader from "../Loader/Loader";
import nodata from '../../icons/nodata.png';
import wind from '../../icons/wind.svg';
import pressure from '../../icons/pressure.svg';
import classes from './WeatherItem.module.scss';
import {capitalizer, getTemp, windDegToText } from '../utils/Functions';
import styled from 'styled-components';

const WindIcon = styled.img`
  width: 15px;
  height: 15px;
  border: none;
  transform: rotate(${props => props.deg}deg);
  
`;

const WeatherItem = ({ id, lat, lon }) => {

    //Auto-update???
    const currRes = useFetch(id, lat, lon, 'curr');
    const currData = currRes.response;
    const detailsRes = useFetch(id, lat, lon);
    const detailsData = detailsRes.response;

    const img = currRes.response ? `https://openweathermap.org/img/wn/${currData.weather[0].icon}@2x.png` : nodata;

    return (
        <>{currRes.response && detailsRes.response ?
            <article className={classes.Weather}>
                <header className={classes.Weather__city}>{currData.name}, <span>[{currData.sys.country}]</span></header>
                <figure className={classes.Weather__main}>
                    <img className={classes.Weather__img} src={img} alt="weather status"/>
                    <figcaption className={classes.Weather__temp}>
                        {Math.trunc(currData.main.temp - 273)}<span className={classes.Weather__degSymb}>°</span>С
                    </figcaption>
                </figure>
                <div className={classes.Weather__body}>
                    {/*<div className={classes.Weather__time}>{utcToLocale(currData.dt)}</div>*/}
                    <span className={classes.Weather__feel}>
                        Feels like {getTemp(currData.main.feels_like)}.{` `}
                        {capitalizer(currData.weather[0].description)}
                    </span>
                    <ul className={classes.Weather__details}>
                        <li className={classes.Weather__line}>
                            <div className={classes.Weather__info}>
                                <WindIcon deg={currData.wind.deg} src={wind} alt="wind direction"/> {` `}
                                <span className={classes.Weather__windSpeed}>{currData.wind.speed}m/s</span>
                                {windDegToText(currData.wind.deg)}
                            </div>
                        </li>
                        <li className={classes.Weather__line}>
                            <div>
                                <img className={classes.Weather__pressureIcon} src={pressure} alt="pressure"/>
                                {currData.main.pressure}hPa
                            </div>
                        </li>
                        <li className={classes.Weather__line}>
                            <div>
                                Humidity: {currData.main.humidity}%
                            </div>
                        </li>
                        <li className={classes.Weather__line}>
                            <div>
                                UV {Math.trunc(detailsData.current.uvi)}%
                            </div>
                        </li>
                        <li className={classes.Weather__line}>
                            <div>
                                Dew point: {getTemp(detailsData.current.dew_point)}
                            </div>
                        </li>
                        <li className={classes.Weather__line}>
                            <div>
                                Visibility {(detailsData.current.visibility / 1000).toFixed(1)}km
                            </div>
                        </li>
                    </ul>
                </div>

            </article> :
            <Loader text="Requesting data"/>}
        </>
    )

};

export default WeatherItem;