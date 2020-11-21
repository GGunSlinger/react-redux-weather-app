import React, { useCallback, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentWeather } from '../redux/weatherSlice';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { current } from '@reduxjs/toolkit';

const containerStyle = {
    width: '50%',
    height: '350px'
};

function Map() {

    const todayWeatherData = useSelector(selectCurrentWeather)

    const {
        lat,
        lon,
        feels_like,
        pressure,
        wind_speed,
        temp,
        visibility,
        sky } = todayWeatherData

    const [selected, setSelected] = useState(false)

    const center = {
        lat: lat,
        lng: lon
    }

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (!lat && !lon) return <div>loading</div>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onMapLoad}
            obClick={(event) => [...current, {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            }]}
        >
            <Marker
                position={{ lat: lat, lng: lon }}
                onClick={() => setSelected(true)}
            />
            {selected ? (
                <InfoWindow
                    position={{ lat: lat, lng: lon }}
                    onCloseClick={() => setSelected(false)}>
                    <div>
                        <p>temp: {temp} &#176;C</p>
                        <p>feels like: {feels_like} &#176;C</p>
                        <p>sky: {sky}</p>
                        <p>pressure: {pressure}</p>
                        <p>wind speed: {wind_speed} meter per second</p>
                        <p>visibility: {visibility / 1000} km</p>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    )
}

export default Map