import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, selectCurrentWeather, saveCity, setError, selectError, fetchWeatherByLatLng } from '../redux/weatherSlice';
import style from '../css/main.module.css';
import { useHistory } from 'react-router-dom';
import Loader from '../utils/Loader';

function Main() {

    const dispatch = useDispatch()

    const history = useHistory()

    const location = history.location.pathname

    const error = useSelector(selectError)

    const { temp, wind_speed, sky, country, city, lat, lon } = useSelector(selectCurrentWeather)

    useEffect(() => {

        let lat = location.split('/')[3]
        let lon = location.split('/')[4]

        if (!city && !lat && !lon) dispatch(fetchWeather())
        else if (lat && lon) dispatch(fetchWeatherByLatLng(lat, lon))

        if (error) {
            history.push('/404')
            dispatch(setError(false))
        }
        
    }, [city, dispatch, error, history, location])

    const handleAdd = () => {
        return dispatch(saveCity(city, lat, lon))
    }

    if (!temp) return <div className={style.wrap}><Loader /></div>

    return (
        <div className={style.wrap}>
            <div className={style.circle + ' ' + style.plus} onClick={handleAdd}></div>
            <p className={style.temp}>{temp} &#176;C</p>
            <p className={style.city}>{city}, {country}</p>
            <div className={style.weather}>
                <p>{sky}, Wind - {wind_speed} meter per second</p>
            </div>
        </div>
    );
}

export default Main;
