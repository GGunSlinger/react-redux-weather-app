import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import style from "./Header.module.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "models/store";
import { fetchWeather } from "store/actions";
import { AppToaster } from "components";
import { Card, Elevation } from "@blueprintjs/core";
import Loader from "components/loader/Loader";

const LocationSearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState("");

  const handleChange = (address: string) => {
    setAddress(address);
  };

  const handleSelect = async (address: string) => {
    try {
      const geocode = await geocodeByAddress(address);
      const { lat, lng } = await getLatLng(geocode[0]);

      unwrapResult(await dispatch(fetchWeather({ lat, lon: lng })));
      setAddress("");
    } catch (e) {
      console.trace(e);
      AppToaster.error({ error: e.message });
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      debounce={400}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Find city...",
              className: `${style.search_input} bp3-input `,
            })}
          />
          {!!suggestions.length && (
            <Card elevation={Elevation.ONE}>
              {loading && <Loader />}
              {!loading &&
                suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? {
                        backgroundColor: "#93dbe9",
                        cursor: "pointer",
                        padding: "3px 0",
                      }
                    : {
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        padding: "3px 0",
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
            </Card>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
