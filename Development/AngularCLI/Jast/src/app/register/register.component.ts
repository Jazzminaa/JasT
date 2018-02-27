import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  getUser: User;
  newUser: User = new User;
  errorText: string;
  password: string;
  date:Date;
  validation:boolean=true;
  validationUsername:boolean=true;
  validationEmail:boolean=true;
  validationPass: boolean=true;
  constructor(private router: Router , private dataService: DataService)  {
    this.newUser.gender = "m";
    this.newUser.username = " ";
  }

  register(){
    this.validationUsername = this.newUser.username != undefined && this.newUser.username.length >= 5;
    this.validationEmail = this.newUser.email != undefined && this.valEmail();
    this.validationPass = this.newUser.password != undefined && this.valPass();
    this.validation = this.validationUsername && this.validationEmail && this.validationPass;
      if (this.newUser.email == "" || this.newUser.password == null )
          this.errorText = "Alle Felder müssen ausgefüllt werden :)";
      else {
          this.getUserByEMail();
          
          if(this.getUser == null && this.validation)
          {
                  //Komisch
                  this.errorText = "Speichern";
                  this.newUser.id = 0;
                  this.newUser.dateOfBirth = this.date.toString();
                  /*this.dataService.insertUser(this.newUser).subscribe(data => {
                  },
                  error => {
                    //alert("Speichern fehlgeschlagen: " + error);
                  });
                  this.router.navigateByUrl("/login");*/
          }
          else if(this.getUser != null)
          {
            this.errorText = "Email existiert bereits";
          }
          else {
              this.errorText = "Achte auf Validierung.";
          }
      }
  }
  emailError:string = "Fehlt";
  valEmail(){
      let pattern = "[A-Z]+@[A-Z]+/.[A-Z]";
      pattern = "[A-Z]+@[A-Z]+"
    let reg:RegExp=new RegExp(pattern);
      if(this.newUser.email.indexOf('@') <=0)
      {
          this.emailError = "@ Fehlt"
          return false;
      }
      else if(!reg.exec(this.newUser.email))
      {
            this.emailError = "So schaut eine Email aus: example@gmail.com";
            return false;
      }
      return true;
  }

  passError:string= "Fehlt";
  valPass()
  {
      if(this.newUser.password != this.password)
      {
          this.passError = "Passwort stimmt nicht mit Retry-Password überein.";
          return false;
      }
      return true;
  }

  getUserByEMail(){
      this.dataService.getUserWithEmail(this.newUser.email).subscribe(data =>{
      this.getUser = data;
    });
  }

  ngOnInit() {
  }

  setGender(num:number){
        switch(num)
        {
            case 1: this.newUser.gender = "m";
            break;
            case 2: this.newUser.gender = "w";
            break;
            case 3: this.newUser.gender = "s";
            break
        }
  }

}
