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
var data_service_1 = require("./shared/data.service");
var core_1 = require("@angular/core");
var user_model_1 = require("./model/user.model");
var AppComponent = (function () {
    function AppComponent(dataService) {
        this.dataService = dataService;
        this.loggedIn = false;
        this.id = 0;
        this.age = 0;
        if (dataService.user != null) {
            this.theUser = dataService.user;
        }
    }
    AppComponent.prototype.logOut = function () {
        this.dataService.user = new user_model_1.User;
        this.dataService.user.username = "Gast";
        this.loggedIn = false;
    };
    AppComponent.prototype.ngDoCheck = function () {
        if (this.dataService.user != undefined && this.dataService.user.id != null) {
            this.loggedIn = true;
        }
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.dataService.user = this.theUser;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getAllCategories();
    };
    AppComponent.prototype.change = function (newid) {
        this.id = newid;
    };
    AppComponent.prototype.getAllCategories = function () {
        var _this = this;
        this.dataService.getCategories().subscribe(function (data) {
            _this.categories = data;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html',
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map