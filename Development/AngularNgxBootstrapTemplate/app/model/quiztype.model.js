"use strict";
var QuizType = (function () {
    function QuizType() {
    }
    QuizType.prototype.getJson = function () {
        return "\"id\": " + this.id + "," +
            "\"name\": \"" + this.name + "\"";
    };
    return QuizType;
}());
exports.QuizType = QuizType;
//# sourceMappingURL=quiztype.model.js.map