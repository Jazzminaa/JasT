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
var data_service_1 = require("./../shared/data.service");
var quiz_model_1 = require("./../model/quiz.model");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/add/operator/switchMap");
var AddQuizComponent = (function () {
    function AddQuizComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.newQuiz = new quiz_model_1.Quiz;
        this.categories = [];
        this.quizTypes = [];
        this.user = [];
        this.hide = false;
        this.getUsers();
        if (dataService.user == null) {
            this.hide = true;
        }
    }
    AddQuizComponent.prototype.ngOnInit = function () {
        this.getAllCategories();
        this.getAllQuizTypes();
    };
    AddQuizComponent.prototype.getAllCategories = function () {
        var _this = this;
        this.dataService.getCategories().subscribe(function (data) {
            _this.categories = data;
        });
    };
    AddQuizComponent.prototype.getAllQuizTypes = function () {
        var _this = this;
        this.dataService.getQuizTypes().subscribe(function (data) {
            _this.quizTypes = data;
        });
    };
    AddQuizComponent.prototype.getUsers = function () {
        var _this = this;
        this.dataService.getUsers().subscribe(function (data) {
            _this.user = data;
        });
    };
    AddQuizComponent.prototype.addQuiz = function () {
        if (this.newQuiz.name == "" || this.newQuiz.category == null || this.newQuiz.quizType == null || this.newQuiz.age == null || this.newQuiz.description == "")
            this.errorText = "Es müssen alle Daten eingegeben werden!";
        else {
            this.errorText = "";
            this.dataService.insertQuiz(this.newQuiz)
                .subscribe(function (data) {
            }, function (error) {
            });
            this.newQuiz = new quiz_model_1.Quiz();
        }
    };
    return AddQuizComponent;
}());
AddQuizComponent = __decorate([
    core_1.Component({
        selector: 'add-quiz',
        templateUrl: 'app/add-quiz/add-quiz.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, data_service_1.DataService])
], AddQuizComponent);
exports.AddQuizComponent = AddQuizComponent;
//# sourceMappingURL=add-quiz.component.js.map