import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LocationInput from "./LocationInput";
import { toast } from "react-toastify";
import '@testing-library/jest-dom';

jest.mock("react-toastify", () => ({
    toast: {
        info: jest.fn(),
    },
}));

const default_lat = 54.4959
const default_lng = 18.5386

jest.mock("@react-google-maps/api", () => {
    const DEFAULT_CENTER = { lat: 54.4959, lng: 18.5386 };
    return {
        useJsApiLoader: () => ({ isLoaded: true, loadError: false }),
        Autocomplete: ({
                           children,
                           onLoad,
                           onPlaceChanged,
                       }: {
            children: React.ReactNode;
            onLoad: (autocomplete: any) => void;
            onPlaceChanged: () => void;
        }) => {
            const { useEffect } = require("react");
            useEffect(() => {
                const mockAutocomplete = {
                    getPlace: jest.fn(() => ({
                        geometry: { location: { lat: () => DEFAULT_CENTER.lat, lng: () => DEFAULT_CENTER.lng } },
                        formatted_address: "Gdynia, Poland",
                    })),
                };
                onLoad(mockAutocomplete);
            }, [onLoad]);
            return <div onClick={onPlaceChanged}>{children}</div>;
        },
    };
});

describe("LocationInput Component", () => {
    const mockOnPlaceSelected = jest.fn();
    const mockOnPlaceRemove = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders input with label", () => {
        render(
            <LocationInput
                label="Test Location"
                onPlaceSelected={mockOnPlaceSelected}
                onPlaceRemove={mockOnPlaceRemove}
            />
        );
        expect(screen.getByLabelText("Test Location")).toBeInTheDocument();
    });

    test("calls onPlaceSelected when a place is chosen", () => {
        render(
            <LocationInput
                label="Test Location"
                onPlaceSelected={mockOnPlaceSelected}
                onPlaceRemove={mockOnPlaceRemove}
            />
        );
        fireEvent.click(screen.getByPlaceholderText("Enter location"));
        expect(mockOnPlaceSelected).toHaveBeenCalledWith({ lat: default_lat, lng: default_lng });
    });

    test("clears input when clear button is clicked", () => {
        render(
            <LocationInput
                label="Test Location"
                onPlaceSelected={mockOnPlaceSelected}
                onPlaceRemove={mockOnPlaceRemove}
            />
        );
        fireEvent.click(screen.getByPlaceholderText("Enter location"));
        fireEvent.click(screen.getByRole("button", { name: /Clear location/i }));
        expect(mockOnPlaceRemove).toHaveBeenCalledWith({ lat: default_lat, lng: default_lng });
        expect(toast.info).toHaveBeenCalledWith("Input cleared");
    });
});
