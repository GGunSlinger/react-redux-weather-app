import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';
import style from '../../css/header.module.css';
import { fetchWeatherByLatLng } from '../../redux/weatherSlice'

const LocationSearchInput = () => {

    const dispatch = useDispatch()
    const [address, setAddress] = useState('')

    const handleChange = address => {
        setAddress(address)
    }

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => dispatch(fetchWeatherByLatLng(latLng.lat, latLng.lng)))
            .catch(error => console.error('Error', error));
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
                            placeholder: 'Find city...',
                            className: `location-search-input ${style.search_input}`,
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
}

export default LocationSearchInput