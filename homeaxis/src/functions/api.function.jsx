import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

const getAllApartmentsFromDB = async () => {
    try {
        const data = await axios.get("/apartments/all");
        return data.data;
    }catch(err) {
        console.log(err);
    }
}

const getAllUsersFromDB = async () => {
    try {
        const data = await axios.get("/users/all");
        return data.data;
    }catch(err) {
        console.log(err);
    }
}

export {getAllApartmentsFromDB, getAllUsersFromDB};