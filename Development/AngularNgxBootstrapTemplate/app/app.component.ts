import { DataService } from './shared/data.service';
import { Category } from './model/category.model';
import { Component, OnInit } from '@angular/core';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent  implements OnInit{
    loggedIn: Boolean = false;
    constructor(private dataService:DataService,private popup:Popup)
    {
      if(dataService.user != null)
      {
          this.loggedIn = dataService.loggedIn;
      }
    }

    categories: Category[];

    ClickButton(){
      this.popup.show();
    }
    

    ngOnInit(){
        this.getAllCategories();
    }

    
    getAllCategories(){
      this.dataService.getCategories().subscribe(data =>{
        this.categories = data;
      })

    }
  
}