import { DataService } from './../shared/data.service';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component(
    {
        selector: 'profile',
        templateUrl: 'app/profile/profile.component.html'
    }
)

export class ProfileComponent{
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