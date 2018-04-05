import { User } from 'app/model/user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ngOnInit(): void {
    this.ReadOnly = true;
  }
  text:string = "Hallo Gast!";
  user:User;
  count:number = 0;
  ReadOnly: boolean = false;
  birthday:Date;
  changenewP:boolean = true;

  passw:String ="";
  newpassword:string =" ";
  retnewpassword:String =" ";

  constructor(private router: Router,private dataService:DataService)
  {
    if(dataService.user != null)
    {
      this.user = this.dataService.user;
      this.user.multiplay = null;
    }
    
  }
   
  edit()
  {
      this.ReadOnly =false;
      this.passw = "";

  }

  cancel()
  {
      this.ReadOnly =true;
      this.dataService.getUserWithEmail(this.user.email).subscribe(data=>{this.user = data;})
      this.passw = "";
  }
  save()
  {

    if(this.user.password == this.passw)
    {
      if( this.newpassword == this.retnewpassword )
      {
        if(!this.changenewP)
        {
            this.user.password = this.newpassword;
        }
        this.changenewP = true;
        this.ReadOnly =true;
        this.saveChange();
        this.passw = "";
      }
      else{
        alert("Neues Passwort stimmt nicht mit der Bestätigung überein!")
      }
    }
    else{
      alert("Passwort stimmt nicht!")
    }
  }
  saveChange(){
    this.dataService.updateUser(this.user).subscribe(data =>{
    
    });
  }
  ngOnDestroy()
  {
      this.dataService.user = this.user;
  }
}