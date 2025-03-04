import React from "react";
import { RouteProvider } from "./context/RouteContext";
import Home from "./pages/Home";
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <>
            <RouteProvider>
                <Home />
            </RouteProvider>
            <ToastContainer position='bottom-right'/>
        </>
    );
}

export default App;
