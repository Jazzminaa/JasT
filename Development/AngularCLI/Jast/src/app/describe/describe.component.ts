import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.css']
})
export class DescribeComponent implements OnInit {
  user:User;

  constructor(private dataService:DataService)
  {
    if(dataService.user != null)
    {
        this.user = dataService.user;
    }
  }

  ngOnInit(){
      
  }
  ngDoCheck(): void {

  }

  ngOnDestroy()
  {
      this.dataService.user = this.user;
  }

}
