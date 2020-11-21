import React from 'react';
import { useSelector } from 'react-redux';
import { selectDailyWeather } from '../redux/weatherSlice';
import style from '../css/week.module.css';

function Week() {
    const dailyWeather = useSelector(selectDailyWeather)

    if (!dailyWeather) return <div>loading</div>

    return (
        <div className={style.wrap}>
            <div className={style.list_wrap}>
                <div className={style.header_text}>
                    <h2>Week</h2>
                    <div>
                        <span>{new Date(dailyWeather[0].dt * 1000).toLocaleString('en', { month: 'long' })}
                        , {new Date(dailyWeather[0].dt * 1000).getDate()} - </span>
                        <span>{new Date(dailyWeather[7].dt * 1000).toLocaleString('en', { month: 'long' })}
                        , {new Date(dailyWeather[7].dt * 1000).getDate()}</span>
                    </div>
                </div>
                <div className={style.list}>
                    {dailyWeather.map(element => {
                        return <div className={style.list_item} key={element.dt}>
                            <p className={style.list_item_header}>
                                {new Date(element.dt * 1000).toLocaleString('en', { month: 'long' })}
                                , {new Date(element.dt * 1000).getDate()}
                            </p>
                            <div className={style.list_item_body}>
                                <div className={style.list_item_text}>
                                    <p className={style.list_item_time}>Day: </p>
                                    <p>{element.temp.day} &#176;C</p>
                                </div>
                                <div className={style.list_item_text}>
                                    <p className={style.list_item_time}>Morning: </p>
                                    <p>{element.temp.morn} &#176;C</p>
                                </div>
                                <div className={style.list_item_text}>
                                    <p className={style.list_item_time}>Night: </p>
                                    <p>{element.temp.night} &#176;C</p>
                                </div>
                                <div className={style.list_item_text}>
                                    <p className={style.list_item_time}>humidity: </p>
                                    <p>{element.humidity} %</p>
                                </div>
                                {(element.snow || element.rain) && <div className={style.list_item_text}>
                                    <p className={style.list_item_time}>precipitation: </p>
                                    <p>{(element.snow && 'snow') || (element.rain && 'rain')}</p>
                                </div>}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Week;
