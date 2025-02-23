import { useState, useCallback } from "react";
import { Autocomplete } from "@react-google-maps/api";
import React from "react";
import {toast} from "react-toastify";

interface Props {
    label: string;
    onPlaceSelected: (location: google.maps.LatLngLiteral) => void;
    onPlaceRemove: (position: google.maps.LatLngLiteral) => void;
}

const LocationInput: React.FC<Props> = ({ label, onPlaceSelected, onPlaceRemove }) => {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [currentPlace, setCurrentPlace] = useState<google.maps.LatLngLiteral | null>(null); // Store lat/lng
    const [inputValue, setInputValue] = useState<string>(''); // Store the string (address/label)

    const onLoad = useCallback((autoC: google.maps.places.Autocomplete) => {
        setAutocomplete(autoC);
    }, []);

    const handleClear = useCallback(() => {
        onPlaceRemove(currentPlace ? currentPlace : { lat: 0, lng: 0 });
        setInputValue('');
        setCurrentPlace(null);
        toast.info("Input cleared");
    }, [currentPlace, onPlaceRemove]);

    const onPlaceChanged = useCallback(() => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                onPlaceSelected(location);
                setCurrentPlace(location);
                setInputValue(place.formatted_address || ''); // Update input value with the place's name
            } else {
                handleClear()
            }
        }
    }, [autocomplete, handleClear, onPlaceSelected]);

    return (
        <div className="mb-2">
            <label htmlFor="location-input" className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <input
                        id="location-input"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 pr-10"
                        type="text"
                        placeholder="Enter location"
                        aria-label={label}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Autocomplete>
                {inputValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        aria-label="Clear location"
                    >
                        ✖
                    </button>
                )}
            </div>
        </div>
    );
};

export default LocationInput;
