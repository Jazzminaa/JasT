import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component(
    {
        selector: 'login',
        templateUrl: 'app/login/login.component.html'
    }
)

export class LoginComponent{

 
    constructor(private router: Router)  {

    }
}