import {getAllApartmentsFromDB, getAllUsersFromDB} from "./api.function.jsx";

const getApartments  = async () => {
    return await getAllApartmentsFromDB();
}

const getUsers = async () => {
    return await getAllUsersFromDB();
}

export {getApartments, getUsers};