import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MapScreen from "./screens/MapScreen/MapScreen";
import { Provider } from "react-redux";
import Store from "./Services/store/Store";

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    render() {
        return (
            <Provider store={Store}>
                <div
                    style={{
                        overflow: "auto",
                        background: "#222",
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 50
                    }}
                >
                    <MapScreen />
                </div>
            </Provider>
        );
    }
}

export default App;
