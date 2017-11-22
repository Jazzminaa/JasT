import { DataService } from './../shared/data.service';
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
    getUser: User = new User;
    newUser: User = new User;
    errorText: string;
    constructor(private router: Router , private dataService: DataService)  {

    }
    checkUser(pass: string){
        if (this.newUser.email == "" || this.newUser.password == null )
            this.errorText = "Einloggen fehlgeschlagen";
        else {
            this.getUserByEMail();
            if(this.getUser.password == this.getUser.password)
            {
                this.errorText = "Hallo";
            }
        }
    }

    getUserByEMail(){
        this.dataService.getUserWithEmail(this.newUser.email).subscribe(data =>{
        this.getUser = data;
      });
    }
}