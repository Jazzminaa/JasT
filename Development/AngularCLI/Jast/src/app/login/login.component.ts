import { Observable  } from 'rxjs/Rx';
import { User } from './../model/user.model';
import { Quiz } from './../model/quiz.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    handleError: any;
    http: any;
    newUser: User = new User;
    errorText: string;
    getUser: User;
    error:string = undefined;


  constructor(private router: Router , private dataService: DataService)  {

  }


   checkUser(){
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
              this.timeout();
              if(this.error=="error")
              {
                  
                this.errorText = "User existiert nicht";
              }
              
            }
      }
  }

  getUserByEmail(){
    this.dataService.getUserWithEmail(this.newUser.email).subscribe(data =>{
        this.getUser = data;
        }, error => {
            this.error="error";
        });         
  }

  timeout() {
    setTimeout(() => {
        if(this.getUser == undefined)
        {
            this.timeout();
        }
        else
        {
            this.checkUser();
            
        }
        
    }, 1000/60);
} 
}