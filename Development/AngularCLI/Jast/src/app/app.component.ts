import { Component, OnInit, DoCheck } from '@angular/core';
import { Category } from './model/category.model';
import { User } from './model/user.model';
import { DataService } from './shared/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit,DoCheck{
  loggedIn: Boolean = false;
  id: number = 0;
  age: number = 0;
  theUser: User;

    timeString : string;
    duration:number= 5;
    seconds = "--";
    minutes = "--";   
    clockDisplay : string; 
    interval: number;

 

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
    this.waitForLogout();
  }
  waitForLogout() {
    setTimeout(() => {

      if(  this.dataService.user.username !="Gast")
      {
        this.logOut();
      }
        
    }, 1000/2);
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
   //   this.tickTick();

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



   /* tickTick(){
            if(this.duration > 0 || this.duration != undefined){
              setInterval( () => {this.duration = this.duration - 1;
            
                if(this.duration % 60 < 10){
                    this.seconds = "0"+this.duration%60;
                }else{
                    this.seconds = (this.duration%60).toString();
                }

                if(this.duration / 60 < 10 ){
                    this.minutes = "0"+parseInt(""+this.duration/60,10);
                }else{
                    this.minutes = ""+parseInt((this.duration / 60).toString(),10);
                }
                this.clockDisplay = this.minutes + " : " +this.seconds; },1000); 
          }
          else
          {
            clearInterval(this.interval);
          }
    }*/

}