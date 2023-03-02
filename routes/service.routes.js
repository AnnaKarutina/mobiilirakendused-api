const { authJwt } = require("../middleware");
const controller = require("../controllers/service.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    app.get(
        "/api/services/",
        [authJwt.verifyToken],
        controller.allServices);

    app.post(
        "/api/services/",
        [authJwt.verifyToken],
        controller.addService
    );

    app.delete(
        "/api/services/",
        [authJwt.verifyToken],
        controller.deleteService
    );

    // app.patch(
    //     "/api/user/profile",
    //     [authJwt.verifyToken],
    //     controller.editProfile
    // );
    //
    // app.get(
    //     "/api/user/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );
};