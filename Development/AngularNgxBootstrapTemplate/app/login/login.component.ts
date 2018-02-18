import { Headers } from '@angular/http';
import { AddQuizComponent } from './../add-quiz/add-quiz.component';
import { AppComponent } from './../app.component';
import { DataService } from './../shared/data.service';
import { User } from './../model/user.model';
import { Router, ActivatedRoute } from '@angular/router';
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
    newUser: User = new User;
    errorText: string;
    getUser: User;

    constructor(private router: Router , private dataService: DataService)  {

    }

    sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }
     checkUser(){
        //new Promise(r => setTimeout(r, 500));
        if (this.newUser.email == "" || this.newUser.password == null || this.newUser.password == "" )
            this.errorText = "Einloggen fehlgeschlagen";
        else {
            this.getUserByEmail();
            if(this.getUser != null){
            if(this.getUser.password == this.newUser.password)
                {
                    this.dataService.user = this.getUser;
                    this.dataService.loggedIn = true;
                    this.errorText = "Perfekt";
                    this.router.navigateByUrl("/home");
                }
                else    
                {
                    this.errorText = "Falsches Password";
                }
            }
            else{
                this.errorText = "User existiert nicht";}
        }
    }

    getUserByEmail(){
        this.dataService.getUserWithEmail(this.newUser.email).subscribe(data =>{
        this.getUser = data;
        })
    }
    
}