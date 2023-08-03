import { createRoot } from "react-dom/client";
import App from "./App";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from 'redux/store/index.js';

import ImportFonts from "utils/ImportFonts";

const container = document.getElementById("root");
const root = createRoot(container);
ImportFonts();

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);