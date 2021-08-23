import { shallowEqual, useSelector } from "react-redux";
import style from "./MainPage.module.css";
import { useHistory } from "react-router-dom";
import Loader from "utils/loader/Loader";
import { deleteCity, fetchCities } from "store/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "models/store";
import { useEffect } from "react";
import { selectCities } from "store/selectors";

const MainPage: React.FC = () => {
  let history = useHistory();

  const dispatch = useAppDispatch();
  const cities = useSelector(selectCities, shallowEqual);

  const fetchData = async () => {
    try {
      unwrapResult(await dispatch(fetchCities()));
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = async (id: number) => {
    unwrapResult(await dispatch(deleteCity(id)));
    fetchData();
  };

  const handleRoute = (city: string, lat: number, lon: number) => {
    history.push(`/today/${city}/${lat}/${lon}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!cities) return <Loader />;

  return (
    <div className={style.wrap}>
      <h2>Saved Cities</h2>
      <div className={style.city_list}>
        {cities.map((element) => {
          return (
            <div className={style.city_item_wrap} key={element.id}>
              <div
                className={style.city_item}
                onClick={() =>
                  handleRoute(element.city, element.lat, element.lon)
                }
              >
                <p>{element.city}</p>
              </div>
              <div
                className={style.circle + " " + style.plus}
                onClick={() => handleRemove(element.id)}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
