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
var user_model_1 = require("./../model/user.model");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var LoginComponent = (function () {
    function LoginComponent(router, dataService) {
        this.router = router;
        this.dataService = dataService;
        this.getUser = new user_model_1.User;
        this.newUser = new user_model_1.User;
        this.getUser.email = "Hallo";
        this.getUser.username = "NAme";
    }
    LoginComponent.prototype.checkUser = function (pass) {
        if (this.newUser.email == "")
            this.errorText = "Einloggen fehlgeschlagen";
        else {
            this.getUserByEMail();
            if (this.getUser.password == this.getUser.password) {
                this.errorText = this.getUser.email;
                this.dataService.onlineUser = this.getUser;
            }
        }
    };
    LoginComponent.prototype.getUserByEMail = function () {
        var _this = this;
        this.dataService.getUserWithEmail(this.newUser.email).subscribe(function (data) {
            _this.getUser = data;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'app/login/login.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, data_service_1.DataService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map