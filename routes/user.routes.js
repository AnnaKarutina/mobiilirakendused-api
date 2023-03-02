const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept, Authorization"
        );
        next();
    });

    app.get("/api/user/all", controller.allAccess);

    app.get(
        "/api/user/profile",
        [authJwt.verifyToken],
        controller.getProfile
    );

    app.patch(
        "/api/user/profile",
        [authJwt.verifyToken],
        controller.editProfile
    );

    app.get(
        "/api/user/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};