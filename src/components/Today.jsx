import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHourlyWeather, fetchWeatherByLatLng } from '../redux/weatherSlice';
import Map from './Map'
import style from '../css/today.module.css';
import { useHistory } from 'react-router-dom';

function Today() {

    const dispatch = useDispatch()

    const history = useHistory()

    const location = history.location.pathname

    const today = location.split('/')[1] === 'today'

    useEffect(() => {
        let lat = location.split('/')[3]
        let lon = location.split('/')[4]
        console.log(lat, lon)
        if (lat && lon) dispatch(fetchWeatherByLatLng(lat, lon)) // eslint-disable-next-line
    }, []) 

    const hourlyWeather = useSelector(selectHourlyWeather)

    if (!hourlyWeather) return <div>loading</div>

    const monthName = (
        today
            ? new Date().toLocaleString('en', { month: 'long' })
            : new Date(hourlyWeather[24].dt * 1000).toLocaleString('en', { month: 'long' })
    )
    const day = (
        today
            ? new Date().getDate()
            : new Date(hourlyWeather[24].dt * 1000).getDate()
    )

    console.log(location.split('/')[2])

    return (
        <div className={style.wrap}>
            <div>
                <h2>{today ? 'Today' : 'Tomorrow'}</h2>
                <p> {monthName}, {day}</p>
                <div className={style.list_header_wrap}>
                    <p className={style.list_header_text}>Time</p><p>Weather</p>
                </div>
                <div className={style.line}></div>
                <div className={style.list_wrap}>
                    {hourlyWeather.map((element, index) => {
                        const day = today ? index <= 23 : index >= 24
                        if (day && index % 3 === 0) {
                            return (
                                <div className={style.list_item}>
                                    <p className={style.list_item_text}>
                                        {new Date(element.dt * 1000).getHours()} : 00
                                    </p>
                                    <p>
                                        {element.temp} &#176;C, {element.weather[0].main}
                                        , Wind - {element.wind_speed} meter per second
                                    </p>
                                </div>
                            )
                        } else return null
                    })}
                </div>
            </div>
            <Map />
        </div>
    );
}

export default Today;
