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
                  //Komisch
                  console.log("Its my birthday"+this.newUser.dateOfBirth);
                  this.errorText = "Speichern";
                  this.newUser.id = 0;
                  this.dataService.insertUser(this.newUser).subscribe(data => {
                  },
                  error => {
                    //alert("Speichern fehlgeschlagen: " + error);
                  });
                  console.log("???birthday"+this.newUser.dateOfBirth);
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

}
