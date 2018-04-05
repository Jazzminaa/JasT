import { User } from 'app/model/user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

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

  passw:String ="";
  constructor(private dataService:DataService)
  {
    if(dataService.user != null)
    {
        this.toOutPutUser(dataService.user);
    }
    
  }
   
  toOutPutUser(u: User) {
    this.user = this.dataService.user;
  }
  edit()
  {
      this.ReadOnly =false;
      this.passw = "";

  }

  cancel()
  {
      this.ReadOnly =true;
      this.passw = "";
  }
  save()
  {
    if(this.user.password == this.passw)
    {
      this.ReadOnly =true;
      this.dataService.user = this.user;
      this.saveChange();
      this.passw = "";
    }
  }
  saveChange(){
    let u : String = this.user.getJson();
    console.log(u);
    this.dataService.updateUser(this.user).subscribe(data =>{
    
    });
  }
  ngOnDestroy()
  {
      this.dataService.user = this.user;
  }
}