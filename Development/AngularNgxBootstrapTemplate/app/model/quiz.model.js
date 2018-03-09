"use strict";
var Quiz = (function () {
    function Quiz() {
    }
    Quiz.prototype.getJson = function () {
        return "{" +
            "\"id\": " + this.id + "," +
            "\"age\": " + this.age + "," +
            "\"creationDate\": 1489490100000," +
            "\"description\": \"" + this.description + "\"," +
            "\"multiplay\": 0," +
            "\"name\": \"" + this.name + "\"," +
            "\"picture\": null," +
            "\"category\": {" +
            "   \"id\": " + this.category.id + "," +
            "  \"name\": \"" + this.category.name + "\"" +
            "}," +
            "\"quiztype\": {" +
            "   \"id\": " + this.quizType.id + "," +
            "  \"name\": \"" + this.quizType.name + "\"" +
            " }," +
            "\"user\": {" +
            "   \"id\": 1," +
            "  \"dateOfBirth\": 1489490100000," +
            " \"email\": \"m@test.com\"," +
            "\"firstname\": \"muster\"," +
            "\"gender\": \"m\"," +
            "\"password\": \"1234\"," +
            "\"picture\": null," +
            "\"lastname\": \"mustermann\"," +
            "\"username\": \"Musti\"," +
            "\"multiplay\": null" +
            "}" +
            "}";
    };
    return Quiz;
}());
exports.Quiz = Quiz;
//# sourceMappingURL=quiz.model.js.map