import { DataService } from './../shared/data.service';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component(
    {
        selector: 'register',
        templateUrl: 'app/register/register.component.html'
    }
)

export class RegisterComponent{
    getUser: User;
    newUser: User = new User;
    birthday: Date;
    errorText: string;
    password: string;
    constructor(private router: Router , private dataService: DataService)  {

    }
    register(){
        if (this.newUser.email == "" || this.newUser.password == null )
            this.errorText = "Alle Felder müssen ausgefüllt werden :)";
        else {
            this.getUserByEMail();
            
            if(this.getUser == null)
            {
                if(this.newUser.password == this.password)
                {
                    this.errorText = "Speichern";
                    this.newUser.id = 0;
                    this.dataService.insertUser(this.newUser).subscribe(data => {
                    },
                    error => {
                      //alert("Speichern fehlgeschlagen: " + error);
                    });
                    //this.dataService.user = this.newUser;
                    this.router.navigateByUrl("/home");
                }
                else{
                    this.errorText = "Passwort nicht gleich!";
                }
            }
            else
                this.errorText = "Email existiert bereits";
        }
    }

    getUserByEMail(){
        this.dataService.getUserWithEmail(this.newUser.email).subscribe(data =>{
        this.getUser = data;
      });
    }
}