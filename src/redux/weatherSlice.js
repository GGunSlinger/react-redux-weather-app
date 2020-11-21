import { createSlice } from '@reduxjs/toolkit';
import { citiesAPI } from '../api/citiesAPI';
import { weatherAPI } from '../api/weatherAPI';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cities: null,
    hourlyWeather: null,
    dailyWeather: null,
    tomorrowWeather: {
      temp: null,
      wind_speed: null,
      sky: null,
      pressure: null,
      feels_like: null,
      city: null,
      snow: null,
      rain: null,
      humidity: null,
      lat: null,
      lon: null
    },
    currentCityData: {
      temp: null,
      wind_speed: null,
      sky: null,
      pressure: null,
      feels_like: null,
      city: null,
      snow: null,
      rain: null,
      humidity: null,
      lat: null,
      lon: null
    },
  },
  reducers: {
    setCurrentWeather: (state, action) => {
      // today
      state.currentCityData.temp = Math.round(action.payload.current.temp)
      state.currentCityData.wind_speed = action.payload.current.wind_speed
      state.currentCityData.sky = action.payload.current.weather[0].main
      state.currentCityData.city = action.payload.timezone.split('/')[1].split('_').join(' ')
      state.currentCityData.lat = action.payload.lat
      state.currentCityData.lon = action.payload.lon
      state.currentCityData.feels_like = Math.round(action.payload.current.feels_like)
      state.currentCityData.pressure = action.payload.current.pressure
      state.currentCityData.visibility = action.payload.current.visibility
      state.currentCityData.snow = action.payload.current.snow
      state.currentCityData.rain = action.payload.current.rain
      state.currentCityData.rain = action.payload.current.humidity
      // tomorrow 
      state.tomorrowWeather.temp = action.payload.daily[0].temp.day
      state.tomorrowWeather.wind_speed = action.payload.daily[0].wind_speed
      state.tomorrowWeather.sky = action.payload.daily[0].weather[0].main
      state.tomorrowWeather.city = action.payload.timezone.split('/')[1].split('_').join(' ')
      state.tomorrowWeather.lat = action.payload.lat
      state.tomorrowWeather.lon = action.payload.lon
      state.tomorrowWeather.feels_like = action.payload.daily[0].feels_like.day
      state.tomorrowWeather.pressure = action.payload.daily[0].pressure
      state.currentCityData.snow = action.payload.daily[0].snow
      state.currentCityData.rain = action.payload.daily[0].rain
      state.currentCityData.humidity = action.payload.daily[0].humidity
      // hourly
      state.hourlyWeather = action.payload.hourly
      // daily
      state.dailyWeather = action.payload.daily
    },
    setCities: (state, action) => {
      state.cities = action.payload
    },
  }
});

export const { setCurrentWeather, setCities, setNewCity } = weatherSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const fetchWeather = () => dispatch => {
  navigator.geolocation.getCurrentPosition(async function (position) {
    weatherAPI.getInitWeather(position.coords.latitude, position.coords.longitude)
      .then(res => dispatch(setCurrentWeather(res.data)))
      .catch(error => console.log(error))
  })
}

export const fetchWeatherByLatLng = (lat, lng) => dispatch => {
  weatherAPI.getInitWeather(lat, lng)
    .then(res => dispatch(setCurrentWeather(res.data)))
    .catch(error => console.log(error))
}

export const fetchCities = () => dispatch => {
  citiesAPI.getCities()
    .then(res => dispatch(setCities(res.data)))
}

export const saveCity = (city, lat, lon) => dispatch => {
  citiesAPI.setCity(city, lat, lon).then(() => dispatch(fetchCities()))
}

export const removeCity = (id) => dispatch => {
  citiesAPI.deleteCity(id).then(() => dispatch(fetchCities()))
}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.weather.value)`
export const selectState = state => state.weather;
export const selectCities = state => state.weather.cities;
export const selectHourlyWeather = state => state.weather.hourlyWeather;
export const selectDailyWeather = state => state.weather.dailyWeather;
export const selectTomorrowWeather = state => state.weather.tomorrowWeather;
export const selectCurrentWeather = state => state.weather.currentCityData;

export default weatherSlice.reducer;
