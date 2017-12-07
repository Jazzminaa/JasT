import { DataService } from './shared/data.service';
import { Category } from './model/category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent  implements OnInit{

    constructor(private dataService:DataService)
    {

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