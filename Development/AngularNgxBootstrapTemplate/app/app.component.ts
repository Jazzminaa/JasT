import { DataService } from './shared/data.service';
import { Category } from './model/category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent  implements OnInit{
  title = 'My First Angular App';
    loggedIn: Boolean = false;
    id: number = 0;
    age: number = 0;
    constructor(private dataService:DataService)
    {
      if(dataService.user != null)
      {
          this.loggedIn = dataService.loggedIn;
      }
    }

    categories: Category[];


    ngOnInit(){
        this.getAllCategories();
    }

    change(newid: number)
    {
      this.id = newid;
    }
    
    getAllCategories(){
      this.dataService.getCategories().subscribe(data =>{
        this.categories = data;
      })

    }
  
}