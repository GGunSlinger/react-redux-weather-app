import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectCurrentWeather } from "store/selectors";
import { fetchCities, fetchWeather, saveCity } from "store/actions";
import style from "./CurrentCity.module.css";
import Loader from "utils/loader/Loader";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "models/store";

const CurrentCity: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const location = history.location.pathname.split("/")[2];

  const currentWeather = useSelector(selectCurrentWeather, shallowEqual);

  const fetchData = async (lat: number, lon: number) => {
    try {
      unwrapResult(await dispatch(fetchWeather({ lat, lon })));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => fetchData(latitude, longitude)
      );
    }
  }, [location]);

  if (!currentWeather) {
    return (
      <div className={style.wrap}>
        <Loader />
      </div>
    );
  }

  const { temp, wind_speed, countryName, cityName, lat, lon, weather } =
    currentWeather;

  const handleAdd = async () => {
    unwrapResult(await dispatch(saveCity({ cityName, lat, lon })));
    unwrapResult(await dispatch(fetchCities()));
  };

  return (
    <div className={style.wrap}>
      <div
        className={style.circle + " " + style.plus}
        onClick={handleAdd}
      ></div>
      <p className={style.temp}>{Math.round(temp)} &#176;C</p>
      <p className={style.cityName}>
        {cityName}, {countryName}
      </p>
      <div className={style.weather}>
        <p>
          {weather[0].description}, Wind - {wind_speed} meter per second
        </p>
      </div>
    </div>
  );
};

export default CurrentCity;
