import { DataService } from './shared/data.service';
import { Category } from './model/category.model';
import { Component, OnInit,DoCheck } from '@angular/core';
import { User } from './model/user.model';

@Component({
  selector: 'my-app',
  templateUrl : 'app/app.component.html',
})
export class AppComponent  implements OnInit,DoCheck{
    loggedIn: Boolean = false;
    id: number = 0;
    age: number = 0;
    theUser: User;
    constructor(private dataService:DataService)
    {
      if(dataService.user != null)
      {
          this.theUser = dataService.user;
      }
    }

    logOut(){
      this.dataService.user = new User;
      this.dataService.user.username ="Gast"; 
      this.loggedIn = false;
    }
    
    ngDoCheck(): void {
      if(this.dataService.user  != undefined && this.dataService.user.id != null)
      {
        this.loggedIn = true;
      }
      
  }
    ngOnDestroy()
    {
        this.dataService.user = this.theUser;
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