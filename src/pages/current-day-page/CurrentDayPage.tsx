import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectHourlyWeather } from "store/selectors";
import Map from "components/map/Map";
import style from "./CurrentDayPage.module.css";
import Loader from "components/loader/Loader";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { HourlyWeather } from "models/weather";
import { useAppDispatch } from "models/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchWeather } from "store/actions";
import { RootState } from "store/store";
import { AppToaster } from "components";

type LatLonType = {
  lat: string | undefined;
  lon: string | undefined;
};

const CurrentDayPage: React.FC<RouteComponentProps<LatLonType>> = ({
  match,
}) => {
  const dispatch = useAppDispatch();

  const today = match.url.split("/")[1] === "today";

  const mapState = (state: RootState) => ({
    hourlyWeather: selectHourlyWeather(state),
  });

  const { hourlyWeather } = useSelector(mapState, shallowEqual);

  let { lat, lon } = match.params;

  const fetchData = async (lat: number, lon: number) => {
    try {
      unwrapResult(await dispatch(fetchWeather({ lat, lon })));
    } catch (e) {
      console.trace(e);
      AppToaster.error({ error: e.message });
    }
  };

  useEffect(() => {
    if (lat && lon) fetchData(+lat, +lon);
  }, [lat, lon]);

  if (!hourlyWeather) return <Loader />;

  const monthName = today
    ? new Date().toLocaleString("en", { month: "long" })
    : new Date(hourlyWeather[24].dt * 1000).toLocaleString("en", {
        month: "long",
      });
  const day = today
    ? new Date().getDate()
    : new Date(hourlyWeather[24].dt * 1000).getDate();

  return (
    <div className={style.wrap}>
      <div>
        <h2>{today ? "Today" : "Tomorrow"}</h2>
        <p>
          {" "}
          {monthName}, {day}
        </p>
        <div className={style.list_header_wrap}>
          <p className={style.list_header_text}>Time</p>
          <p>Weather</p>
        </div>
        <div className={style.line}></div>
        <div className={style.list_wrap}>
          {hourlyWeather.map((element: HourlyWeather, index: number) => {
            const day = today ? index <= 23 : index >= 24;
            if (day && index % 3 === 0) {
              return (
                <div className={style.list_item} key={index}>
                  <p className={style.list_item_text}>
                    {new Date(element.dt * 1000).getHours()} : 00
                  </p>
                  <p>
                    {element.temp} &#176;C, {element.weather[0].main}, Wind -{" "}
                    {element.wind_speed} meter per second
                  </p>
                </div>
              );
            } else return null;
          })}
        </div>
      </div>
      <Map />
    </div>
  );
};

export default CurrentDayPage;
