import * as axios from "axios";

const weather = axios.create({ baseURL: 'http://api.openweathermap.org/' })
const appId = '&units=metric&lang=en&appid=4aaa6ddbde83aae9ede27f89d73c503e'

export const weatherAPI = {
    getInitWeather(lat, lon) {
        return weather.get(`data/2.5/onecall?lat=${lat}&lon=${lon}${appId}`)
    },
}
