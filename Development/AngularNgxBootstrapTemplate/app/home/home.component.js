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
var core_1 = require("@angular/core");
require("rxjs/add/operator/switchMap");
var HomeComponent = (function () {
    function HomeComponent(dataService) {
        this.dataService = dataService;
        this.title = 'My First Angular App';
        if (dataService.user != null) {
            this.text = "Hallo " + dataService.user.username;
            this.user = dataService.user;
        }
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.dataService.user = this.user;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'app/home/home.component.html'
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map