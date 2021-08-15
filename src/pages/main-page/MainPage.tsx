import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectCities, removeCity } from "redux/weatherSlice";
import style from "./MainPage.module.css";
import { useHistory } from "react-router-dom";
import Loader from "utils/loader/Loader";

const MainPage: React.FC = () => {
  let history = useHistory();

  const dispatch = useDispatch();
  const cities = useSelector(selectCities);

  useEffect(() => {
    !cities && dispatch(fetchCities());
  }, [cities, dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeCity(id));
  };

  const handleRoute = (city: string, lat: number, lon: number) => {
    history.push(`/today/${city}/${lat}/${lon}`);
  };

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
