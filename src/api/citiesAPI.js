import * as axios from "axios";

const cities = axios.create({ baseURL: 'http://localhost:8080/' })

export const citiesAPI = {
    getCities() {
        return cities.get('cities')
    },
    deleteCity(id) {
        return cities.delete(`cities/${id}`)
    },
    setCity(city, lat, lon) {
        return cities.post('cities', {
            "city": city,
            "lat": lat,
            "lon": lon
        })
    }
}


