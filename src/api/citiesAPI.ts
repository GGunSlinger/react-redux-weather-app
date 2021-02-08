import { citiesType } from "./../types/types"
import axios, { AxiosInstance } from "axios"

const cities: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
})

export const citiesAPI = {
  getCities() {
    return cities.get<citiesType[]>("cities")
  },
  deleteCity(id: number) {
    return cities.delete<citiesType>(`cities/${id}`)
  },
  setCity(city: string, lat: number, lon: number) {
    return cities.post<citiesType>("cities", {
      city: city,
      lat: lat,
      lon: lon,
    })
  },
}
