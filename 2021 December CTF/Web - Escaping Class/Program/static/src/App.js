import React from "react";
import Main from "./Main";
import { Routes, Route, Link } from "react-router-dom";
import Classroom from "./Classroom";

function App() {

    return (<>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/classroom" element={<Classroom />} />
        </Routes>
    </>);
}

export default App;