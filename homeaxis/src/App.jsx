import './App.css'
import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom";
import {getApartments, getUsers} from "./functions/function.function.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
    const [apartments, setApartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [apartment, setApartment] = useState([]);
    const [checkedUser, setCheckedUser] = useState(false);
    const [checkedApartment, setCheckedApartment] = useState(false);

    useEffect(() => {
        const getApartmentsFromDB  = async () => {
            const data = await getApartments();
            setApartments(data);
        }
        getApartmentsFromDB();
    },[checkedApartment]);

    useEffect(() => {
        const getUsersFromDB  = async () => {
            const data = await getUsers();
            setUsers(data);
        }
        getUsersFromDB();
    }, [checkedUser]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App
