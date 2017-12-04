import { DataService } from './shared/data.service';
import { Category } from './model/category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent  implements OnInit{
    loggedIn: Boolean = false;
    constructor(private dataService:DataService)
    {
      if(dataService.user != null)
      {
          this.loggedIn = true;
      }
    }

    categories: Category[];

    ngOnInit(){
        this.getAllCategories();
    }
    
    getAllCategories(){
      this.dataService.getCategories().subscribe(data =>{
        this.categories = data;
      })
    }
  
}