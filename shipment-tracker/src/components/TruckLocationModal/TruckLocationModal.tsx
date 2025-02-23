import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Modal from "react-modal";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {DEFAULT_CENTER, SOCKET_URL} from "../../config/defaults";
import {toast} from "react-toastify";

Modal.setAppElement("#root");

interface TruckLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TruckPosition {
    lat: number;
    lng: number;
}

const TruckLocationModal = ({ isOpen, onClose }: TruckLocationModalProps) => {
    const [truckPosition, setTruckPosition] = useState<TruckPosition>(DEFAULT_CENTER);

    useEffect(() => {
        if (!isOpen) return;

        const socket = new SockJS(SOCKET_URL);
        const client = Stomp.over(socket);

        client.connect({}, (frame: any) => {
            toast.info("Connected to truck")
            client.subscribe("/topic/truckLocation", (messageOutput) => {
                try {
                    const received = JSON.parse(messageOutput.body);
                    if (received.lat && received.lng) {
                        setTruckPosition({ lat: received.lat, lng: received.lng });
                    }
                } catch (error) {
                    toast.error(`Error parsing truck location: ${error}`)
                }
            });
        });

        return () => {
            client.disconnect();
        };
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 z-50 flex justify-center items-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-4">
                <h2 className="text-lg font-bold mb-2">Truck Location</h2>

                <div className="w-full h-[400px]">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={{ lat: truckPosition.lat, lng: truckPosition.lng }}
                        zoom={15}
                    >
                        {truckPosition && <Marker position={truckPosition} />}
                    </GoogleMap>
                </div>

                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default TruckLocationModal;
