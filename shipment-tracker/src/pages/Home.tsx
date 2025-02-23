import React, { useContext, useState } from "react";
import { RouteContext } from "../context/RouteContext";
import LocationInput from "../components/LocationInput/LocationInput";
import Map from "../components/Map/Map";
import TruckLocationModal from "../components/TruckLocationModal/TruckLocationModal";
import {Libraries, LoadScript} from "@react-google-maps/api";
import { toast } from "react-toastify";

const libraries: Libraries = ["places"];

const Home = () => {
    const { setStart, setEnd, addWaypoint, removeWaypoint } = useContext(RouteContext)!;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
            libraries={libraries}
            onLoad={() => setIsLoaded(true)}
            onError={(error) => {
                toast.error(error.message);
            }}
        >
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Shipment Route Manager</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Show Truck Location
                    </button>
                </div>

                <LocationInput label="Start Point" onPlaceSelected={setStart} onPlaceRemove={() => setStart(null)} />
                <LocationInput label="End Point" onPlaceSelected={setEnd} onPlaceRemove={() => setEnd(null)} />
                <LocationInput label="Add Waypoint" onPlaceSelected={addWaypoint} onPlaceRemove={removeWaypoint} />
                <Map isLoaded={isLoaded} />

                <TruckLocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </LoadScript>
    );
};

export default Home;
