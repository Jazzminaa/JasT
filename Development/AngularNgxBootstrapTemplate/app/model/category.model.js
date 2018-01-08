"use strict";
var Category = (function () {
    function Category() {
    }
    Category.prototype.getJson = function () {
        return "\"id\": " + this.id + "," +
            "\"name\": \"" + this.name + "\"";
    };
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.model.js.map