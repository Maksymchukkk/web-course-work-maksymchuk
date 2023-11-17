import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouterNames} from "./RouterNames";
import MainPage from "../page/MainPage/MainPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={RouterNames.HOME} element={<MainPage/>}/>
        </Routes>
    );
};

export default AppRouter;