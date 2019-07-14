import React from "react";
import logo from "./logo.svg";
import "./App.css";

import MapScreen from "./screens/MapScreen/MapScreen";
import { Provider } from "react-redux";
import Store from "./Services/store/Store";
import ScreenWrapper from "screens/ScreenWrapper";

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
    render() {
        return (
            <Provider store={Store}>
                <ScreenWrapper />
            </Provider>
        );
    }
}

export default App;
