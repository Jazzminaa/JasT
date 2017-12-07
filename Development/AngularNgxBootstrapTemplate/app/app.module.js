"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var qandainput_component_1 = require("./qanda/qandainput.component");
var qanda_component_1 = require("./qanda/qanda.component");
var quiz_overview_component_1 = require("./quiz-overview/quiz-overview.component");
var login_component_1 = require("./login/login.component");
var data_service_1 = require("./shared/data.service");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var add_quiz_component_1 = require("./add-quiz/add-quiz.component");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/of");
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'addquiz', component: add_quiz_component_1.AddQuizComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'quizoverview', component: quiz_overview_component_1.QuizOverviewComponent },
    { path: 'qanda/:id', component: qanda_component_1.QAndAComponent },
    { path: 'qandainput', component: qandainput_component_1.QAndAInputComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(appRoutes),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule
        ],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, add_quiz_component_1.AddQuizComponent, login_component_1.LoginComponent, quiz_overview_component_1.QuizOverviewComponent, qanda_component_1.QAndAComponent, qandainput_component_1.QAndAInputComponent],
        providers: [data_service_1.DataService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map