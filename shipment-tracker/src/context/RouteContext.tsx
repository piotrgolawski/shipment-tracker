import React, { createContext, useState, ReactNode } from "react";

export type RouteContextType = {
    start: google.maps.LatLngLiteral | null;
    end: google.maps.LatLngLiteral | null;
    waypoints: google.maps.LatLngLiteral[];
    setStart: (start: google.maps.LatLngLiteral | null) => void;
    setEnd: (end: google.maps.LatLngLiteral | null) => void;
    setWaypoints: (waypoints: google.maps.LatLngLiteral[]) => void;
    addWaypoint: (waypoint: google.maps.LatLngLiteral) => void;
    removeWaypoint: (position: google.maps.LatLngLiteral) => void;
};

export const RouteContext = createContext<RouteContextType>({
    start: null,
    end: null,
    waypoints: [],
    setStart: () => {},
    setEnd: () => {},
    setWaypoints: () => {},
    addWaypoint: () => {},
    removeWaypoint: () => {},
});

type RouteProviderProps = {
    children: ReactNode;
};

export function RouteProvider({ children }: RouteProviderProps) {
    const [start, setStart] = useState<google.maps.LatLngLiteral | null>(null);
    const [end, setEnd] = useState<google.maps.LatLngLiteral | null>(null);
    const [waypoints, setWaypoints] = useState<google.maps.LatLngLiteral[]>([]);

    const addWaypoint = (waypoint: google.maps.LatLngLiteral) => {
        setWaypoints([...waypoints, waypoint]);
    };

    const removeWaypoint = (position: google.maps.LatLngLiteral) => {
        setWaypoints(waypoints.filter((savedPosition) => savedPosition !== position));
    };

    return (
        <RouteContext.Provider
            value={{ start, end, waypoints, setStart, setEnd, setWaypoints, addWaypoint, removeWaypoint }}
        >
            {children}
        </RouteContext.Provider>
    );
}
