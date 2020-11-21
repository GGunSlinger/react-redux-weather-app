import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, selectCities, removeCity } from '../redux/weatherSlice';
import style from '../css/cities.module.css';
import { useHistory } from 'react-router-dom';
import Loader from '../utils/Loader';

function Cities() {

    let history = useHistory();

    const dispatch = useDispatch()
    const cities = useSelector(selectCities)

    useEffect(() => {
        !cities && dispatch(fetchCities())
    })

    const handleRemove = (id) => {
        dispatch(removeCity(id))
    }

    const handleRoute = (city, lat, lon) => {
        history.push(`/today/${city}/${lat}/${lon}`)
    }

    if (!cities) return <Loader />

    return (
        <div className={style.wrap}>
            <h2>Saved Cities</h2>
            <div className={style.city_list}>
                {cities.map(element => {
                    return <div className={style.city_item_wrap}>
                        <div
                            key={element.id}
                            className={style.city_item}
                            onClick={() => handleRoute(element.city, element.lat, element.lon)}
                        >
                            <p>{element.city}</p>
                        </div>
                        <div className={style.circle + ' ' + style.plus}
                            onClick={() => handleRemove(element.id)}>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Cities;
