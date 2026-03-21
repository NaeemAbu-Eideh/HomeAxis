const ApartmentController = require('../controllers/apartment.controller');
module.exports = (app) => {
    app.get("/api/apartments/all", ApartmentController.getAllApartments);
    app.get("/api/apartments/find-by-id", ApartmentController.getApartment);
    app.put("/api/apartments/edit-apartment", ApartmentController.updateApartment);
    app.post("/api/apartments/add-apartment", ApartmentController.createApartment);
    app.delete("/api/apartments/delete-apartment", ApartmentController.deleteApartment);
}