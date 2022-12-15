const UserController = require("./controllers/user.controller")
const authenticate = require("./config/authenticate")

module.exports = function(app){

    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);  

    app.get("/api/users", UserController.getAll);
    app.get("/api/user/:id",UserController.getUser)


    app.get("/api/usersE/",UserController.getAllEstudiante)
    app.post("/api/user/comunicacion/:id",UserController.addEstudianteComunicacion)
    app.put("/api/user/comunicacion/",UserController.addAllEstudianteComunicacion)
    app.get("/api/user/comunicacion/:id",UserController.getComunicacionFromEstudiante)
    app.delete("/api/user/:id",UserController.deleteEstudiante)
    app.put("/api/user/comunicacion/:id",UserController.updateComunicacion)
    app.get("/api/user/comunicacionOnly/:id",UserController.getComunicacionFromEstudiante)







}