const UserController = require('../controllers/user.controller');
module.exports = (app) => {
    app.get("/api/users/all", UserController.findAllUsers);
    app.get("/api/users/find-by-id", UserController.findUserById);
    app.get("/api/users/find-by-email", UserController.findUserByEmail);
    app.get("/api/users/edit-user", UserController.editUser);
    app.get("/api/users/add-user", UserController.addUser);
    app.get("/api/users/delete-user", UserController.deleteUser);
}