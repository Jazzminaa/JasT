import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { User } from '../model/user.model';

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
  newUser:User;
  outPutUser: User;
  oldUser:User;
  count:number = 0;
  ReadOnly: boolean = false;
  birthday:Date;
  constructor(private dataService:DataService)
  {
    if(dataService.user != null)
    {
      this.birthday = new Date(dataService.user.dateOfBirth.toString());
        this.toOutPutUser(dataService.user);
    }
    
  }
   
  toOutPutUser(u: User) {
    //this.oldUser = this.outPutUser;
    this.outPutUser = this.oldUser;
  }
  edit()
  {
      this.ReadOnly =false;
  }
  save()
  {
      this.ReadOnly =true;
  }
  ngOnDestroy()
  {
      this.dataService.user = this.newUser;
  }
}