import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
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