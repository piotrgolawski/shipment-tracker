import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { RouteContext } from "../../context/RouteContext";
import { DEFAULT_CENTER } from "../../config/defaults";
import { toast } from "react-toastify";

const Map = ({ isLoaded }: { isLoaded: boolean }) => {
    const { start, end, waypoints } = useContext(RouteContext);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setDistance] = useState<string | null>(null);
    const [duration, setDuration] = useState<string | null>(null);

    const fetchDirections = useCallback(() => {
        if (!start || !end) {
            setDirections(null);
            setDistance(null);
            setDuration(null);
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
                if (status === google.maps.DirectionsStatus.OK && result) {
                    setDirections(result);
                    const leg = result.routes[0]?.legs[0];
                    if (leg) {
                        setDistance(leg.distance?.text || "");
                        setDuration(leg.duration?.text || "");
                    }
                } else {
                    let message = status.toString();
                    if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
                        message = "No results for given path";
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
            <div id='distance' className="mt-2 text-sm text-gray-700">
                {distance && duration && <p>Distance: {distance} | Duration: {duration}</p>}
            </div>
        </div>
    );
};

export default Map;
