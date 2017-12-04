
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component(
    {
        selector: 'home',
        templateUrl: 'app/home/home.component.html'
    }
)
export class HomeComponent {
    text:string;
    constructor(private dataService:DataService)
    {
      if(dataService.user != null)
      {
          this.text = "Hallo " + dataService.user.username;
      }
    }
}