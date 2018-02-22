
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user.model';

@Component(
    {
        selector: 'home',
        templateUrl: 'app/home/home.component.html'
    }
)
export class HomeComponent implements OnInit {
    text:string = "Hallo Gast!";
    user:User;
    count:number = 0;
    constructor(private dataService:DataService)
    {
      if(dataService.user != null)
      {
          this.user = dataService.user;
          this.text = "Hallo "+this.user.username+ "!";
      }
    }

    ngOnInit(){
        
    }
    ngDoCheck(): void {
        if(this.dataService.user  != undefined)
        {
            this.user = this.dataService.user;
            this.text = "Hallo "+this.user.username+ "!";
        }
    }

    ngOnDestroy()
    {
        this.dataService.user = this.user;
    }
}