"use strict";
var User = (function () {
    function User() {
    }
    User.prototype.getJson = function () {
        return "{" +
            "\"id\": 0," +
            "\"dateOfBirth\": " + "1489490100000" + "," +
            "\"email\": \"" + this.email + "\"," +
            "\"firstname\": \"" + this.firstName + "\"," +
            "\"gender\": \"" + this.gender + "\"," +
            "\"password\": \"" + this.password + "\"," +
            "\"picture\": null," +
            "\"lastname\": \"" + this.lastName + "\"," +
            "\"username\": \"" + this.username + "\"," +
            "\"multiplay\": null" +
            "}";
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map