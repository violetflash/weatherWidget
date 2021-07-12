import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import classes from './App.module.scss';
import AddLocation from "./Components/AddLocation/AddLocation";
import UseLocalStorage from './Components/Hooks/useLocalStorage/useLocalStorage';
import Context from '../src/Components/utils/Context';
import Weather from "./Components/Weather/Weather";
import useFDB from "./Components/Hooks/useFDB/useFDB";
import useSearchDropdown from "./Components/Hooks/useSearchDropdown/useSearchDropdown";
import useSearchInputValue from './Components/Hooks/useSearchInputValue/useSearchInputValue';
import UseCityId from "./Components/Hooks/useCityID/useCityID";
import UseOpenSettings from "./Components/Hooks/useOpenSettings/useOpenSettings";
import Settings from "./Components/Settings/Settings";
import UseBurgerDrag from '../src/Components/Hooks/useBurgerDrag/useBurgerDrag';



const firebaseConfig = {
    apiKey: "AIzaSyAYrAPYWT6zHQhgMvI5oLjEcRjHkrdxw5o",
    authDomain: "weatherwidget-12718.firebaseapp.com",
    databaseURL: "https://weatherwidget-12718-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "weatherwidget-12718",
    storageBucket: "weatherwidget-12718.appspot.com",
    messagingSenderId: "1025655925299",
    appId: "1:1025655925299:web:3861774bcf02fb8fe2d146"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App = () => {

    const fdb = useFDB(firebase.database());
    const lsState = UseLocalStorage('city', []);
    const searchDropdownState = useSearchDropdown();
    const searchState = useSearchInputValue();
    const cityIDState = UseCityId();
    const openSettingsState = UseOpenSettings();
    const burgerState = UseBurgerDrag();

    const firstOpened = !lsState.storedValue.length ? <AddLocation /> : null;
    const settings = openSettingsState.openSettings && lsState.storedValue.length > 0 ? <Settings /> : null;
    const weather = !openSettingsState.openSettings && lsState.storedValue.length > 0 ? <Weather /> : null;

    return (
        <Context.Provider value={{
            lsState,
            fdb,
            searchDropdownState,
            searchState,
            cityIDState,
            openSettingsState,
            burgerState
        }}>
            <article className={classes.Widget}>
                {firstOpened}
                {weather}
                {settings}
            </article>
        </Context.Provider>

    );
};

export default App;
