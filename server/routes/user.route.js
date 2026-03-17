const UserController = require('../controllers/user.controller');
module.exports = (app) => {
    app.get("/api/users/all", UserController.findAllUsers);
    app.get("/api/users/find-by-id", UserController.findUserById);
    app.get("/api/users/find-by-email", UserController.findUserByEmail);
    app.put("/api/users/edit-user", UserController.editUser);
    app.post("/api/users/add-user", UserController.addUser);
    app.delete("/api/users/delete-user", UserController.deleteUser);
}