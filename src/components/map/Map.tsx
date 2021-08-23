import { useCallback, useState, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectCurrentWeather } from "store/selectors";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import Loader from "components/loader/Loader";

const containerStyle = {
  width: "50%",
  height: "350px",
};

const Map: React.FC = () => {
  const todayWeatherData = useSelector(selectCurrentWeather, shallowEqual);

  const [selected, setSelected] = useState(false);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (!todayWeatherData) return <Loader />;

  const { temp, wind_speed, feels_like, pressure, lat, lon, visibility } =
    todayWeatherData;

  const center = {
    lat: lat,
    lng: lon,
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onMapLoad}
      onClick={(event) => [
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
      ]}
    >
      <Marker
        position={{ lat: lat, lng: lon }}
        onClick={() => setSelected(true)}
      />
      {selected ? (
        <InfoWindow
          position={{ lat: lat, lng: lon }}
          onCloseClick={() => setSelected(false)}
        >
          <div>
            <p>temp: {temp} &#176;C</p>
            <p>feels like: {feels_like} &#176;C</p>
            {/* <p>sky: {sky}</p> */}
            <p>pressure: {pressure}</p>
            <p>wind speed: {wind_speed} meter per second</p>
            <p>visibility: {visibility / 1000} km</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
