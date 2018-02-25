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
  constructor(private router: Router , private dataService: DataService)  {
    this.newUser.gender = "m";
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
                  //Komisch
                  this.errorText = "Speichern";
                  this.newUser.id = 0;
                  this.newUser.dateOfBirth = this.date.toString();
                  this.dataService.insertUser(this.newUser).subscribe(data => {
                  },
                  error => {
                    //alert("Speichern fehlgeschlagen: " + error);
                  });
                  this.router.navigateByUrl("/login");
              }
              else{
                  this.errorText = "Passwort nicht gleich!";
              }
          }
          else {
              this.errorText = "Email existiert bereits";
          }
      }
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
