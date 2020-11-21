import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, selectCurrentWeather, saveCity } from '../redux/weatherSlice';
import style from '../css/main.module.css';
import { useHistory } from 'react-router-dom';

function Main() {

    const dispatch = useDispatch()

    const history = useHistory()

    const {temp, wind_speed, sky, city, lat, lon} = useSelector(selectCurrentWeather)

    useEffect(() => {
        let day = history.location.pathname.split('/')[2] === undefined
        !city && day && dispatch(fetchWeather())
    })
    
    const handleAdd = () => {
        return dispatch(saveCity(city, lat, lon))
    }

    return (
        <div className={style.wrap}>
            <div className={style.circle+ ' ' +style.plus} onClick={handleAdd}></div>
            <p className={style.temp}>{temp} &#176;C</p>
            <p className={style.city}>{city}</p>
            <div className={style.weather}>
                <p>{sky}, Wind - {wind_speed} meter per second</p>
            </div>
        </div>
    );
}

export default Main;
