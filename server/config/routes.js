var path = require("path");
var users = require("./../controllers/users");
module.exports = function(app) {
// ~~~~~~~~~~~~~~~~~ LOGIN ~~~~~~~~~~~~~~~~~ //
    app.post("/logging_in", function(req, res) {
        users.logging_in(req, res);
    })

    app.get("/logged_in", function(req, res) {
        users.logged_in(req, res);
    })

    app.get("/logout", function(req, res) {
        users.logout(req, res);
    })

// ~~~~~~~~~~~~~~~~~ FRIEND ~~~~~~~~~~~~~~~~~ //
    app.post("/get_user", function(req, res) {
        users.get_user(req, res);
    })

    app.get("/get_users", function(req, res) {
        users.get_users(req, res);
    })

    app.post("/pending_friend", function(req, res) {
        users.pending_friend(req, res);
    })

    app.post("/add_friend", function(req, res) {
        users.add_friend(req, res);
    })

    app.post("/edit_about", function(req, res) {
        users.edit_about(req, res);
    })

// ~~~~~~~~~~~~~~~~~ ADMIN ~~~~~~~~~~~~~~~~~ //
    app.get("/clear", function(req, res) {
        users.clear(req, res);
    })

    app.get("/admin", function(req, res) {
        users.show_all(req, res);
    })

// ~~~~~~~~~~~~~~~~~ CATCH ALL ~~~~~~~~~~~~~~~~~ //
    app.all("**", (request, response) => {
        response.sendFile(path.resolve("./client/dist/index.html"))
    });
}
