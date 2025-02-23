import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { RouteContext } from "../../context/RouteContext";
import { DEFAULT_CENTER } from "../../config/defaults";
import {toast} from "react-toastify";

const Map = ({isLoaded} : {isLoaded: boolean}) => {
    const { start, end, waypoints} = useContext(RouteContext);

    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

    const fetchDirections = useCallback(() => {
        if (!start || !end) {
            setDirections(null);
            return;
        }

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: start, 
                destination: end,
                waypoints: (waypoints || []).map((wp) => ({ location: wp, stopover: true })),
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                } else {
                    let message = status.toString()
                    // TODO translate more of those results
                    if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
                        message = "No results for given path"
                    }
                    toast.error(message);
                }
            }
        );
    }, [start, end, waypoints]);

    useEffect(() => {
        fetchDirections();
    }, [fetchDirections]);

    if (!isLoaded) {
        return <p className="text-gray-500">Loading Google Maps...</p>;
    }

    return (
        <div className="w-full h-[500px]">
            <GoogleMap mapContainerClassName="w-full h-full" center={start || DEFAULT_CENTER} zoom={10}>
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </div>
    );
};

export default Map;
