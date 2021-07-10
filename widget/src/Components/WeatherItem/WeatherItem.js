import React from 'react';
import useFetch from "../Hooks/useFetch/useFetch";
import Loader from "../Loader/Loader";
import nodata from '../../icons/nodata.png';
import classes from './WeatherItem.module.scss';
import {capitalizer, getTemp} from '../utils/Functions';

const WeatherItem = ({id}) => {

    const res = useFetch(id);
    const data = res.response;
    console.log(data);
    console.log(id);



    const img = res.response ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : nodata;
    return (
        <>{res.response ?
            <article className={classes.Weather}>
                <header className={classes.Weather__city}>{data.name}, <span>{data.sys.country}</span></header>
                <figure className={classes.Weather__main}>
                    <img className="1" src={img} alt=""/>
                    <figcaption className={classes.Weather__temp}>
                        {Math.trunc(data.main.temp - 273)}<span className={classes.Weather__degSymb}>°</span>С
                    </figcaption>
                </figure>
                <div className={classes.Weather__body}>
                    <span className={classes.Weather__feel}>
                        Feels like {getTemp(data.main.feels_like)}.{` `}
                        {data.weather[0].main}.{` `}
                        {capitalizer(data.weather[0].description)}
                    </span>
                    <div className={classes.Weather__details}>

                    </div>
                </div>

            </article> :
            <Loader/>}
        </>
    )

};

export default WeatherItem;