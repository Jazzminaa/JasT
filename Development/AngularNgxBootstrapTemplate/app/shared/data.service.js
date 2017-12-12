"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.API_Url = "http://vm86.htl-leonding.ac.at:8080/JAST/rest/";
        this.cat = "";
    }
    DataService.prototype.getCategories = function () {
        return this.http.get(this.API_Url + "categories" + this.cat)
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.getUsers = function () {
        return this.http.get(this.API_Url + "users")
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.getUserWithEmail = function (mail) {
        return this.http.get(this.API_Url + "users/email/" + mail)
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.getQuizTypes = function () {
        return this.http.get(this.API_Url + "quiztypes")
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.getQuizes = function () {
        return this.http.get(this.API_Url + "quizes")
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.insertQuiz = function (quiz) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url + "quizes", quiz.getJson(), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.getContentById = function (quizId) {
        return this.http.get(this.API_Url + "content/quiz/" + quizId)
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.insertScore = function (score) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.API_Url + "scores", score.getJson(), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DataService.prototype.insertUser = function (user) {
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        return this.http.post(this.API_Url + "users", user.getJson(), { headers: headers }).map(function (data) { return data.json(); });
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map