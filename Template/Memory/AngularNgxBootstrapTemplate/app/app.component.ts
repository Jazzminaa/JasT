import { DataService } from './shared/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent  implements OnInit{
    constructor(private dataService:DataService)
    {
    }

    ngOnInit(){
        
    }

  
}