import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchWeather,
  selectCurrentWeather,
  saveCity,
} from "../redux/weatherSlice"
import style from "../css/main.module.css"
import Loader from "../utils/Loader"
import { useHistory } from "react-router-dom"

const Main: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const location = history.location.pathname.split("/")[2]

  const { temp, wind_speed, sky, country, city, lat, lon } = useSelector(
    selectCurrentWeather
  )

  useEffect(() => {
    if (!location) {
      // if location without lat lon
      dispatch(fetchWeather())
    }
  }, [dispatch, location])

  const handleAdd = () => dispatch(saveCity(city, lat, lon))

  if (!temp)
    return (
      <div className={style.wrap}>
        <Loader />
      </div>
    )

  return (
    <div className={style.wrap}>
      <div
        className={style.circle + " " + style.plus}
        onClick={handleAdd}
      ></div>
      <p className={style.temp}>{temp} &#176;C</p>
      <p className={style.city}>
        {city}, {country}
      </p>
      <div className={style.weather}>
        <p>
          {sky}, Wind - {wind_speed} meter per second
        </p>
      </div>
    </div>
  )
}

export default Main
