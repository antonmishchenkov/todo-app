import React, {createContext} from 'react';
import Store from "./store/store";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

export interface IStore {
    store: Store,
}

export const store = new Store();

export const Context = createContext<IStore>({
    store,
})

function App() {
    return (
        <Context.Provider value={{
            store
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;
