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
    throw new Error("Method not implemented.");
  }
  text:string = "Hallo Gast!";
  newUser:User;
  count:number = 0;
  ReadOnly: boolean = true;
  constructor(private dataService:DataService)
  {
    if(dataService.user != null)
    {
        this.newUser = dataService.user;
        this.text = "Hallo "+this.newUser.username+ "!";
    }
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