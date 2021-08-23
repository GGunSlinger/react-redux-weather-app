import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import style from "./Header.module.css";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "models/store";
import { fetchWeather } from "store/actions";

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
      console.log(e);
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
              className: `location-search-input ${style.search_input}`,
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
