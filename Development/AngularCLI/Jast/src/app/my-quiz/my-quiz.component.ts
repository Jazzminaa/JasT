import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { User } from '../model/user.model';
import { Quiz } from '../model/quiz.model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-quiz',
  templateUrl: './my-quiz.component.html',
  styleUrls: ['./my-quiz.component.css']
})
export class MyQuizComponent implements OnInit {
      display: string;
  
   
      quizes: Quiz[];
      user: User;
      name:string = "Kein User";
      testId:number=0;
      age:number=0;
      quizTypeVar: string;
      filter:string = "";
      quizesBegin: Quiz[];
      quizname:string ="Quiz";
      quizdescription = "something";
      constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
          
          if(dataService.user != null)
          {
              this.user = dataService.user;
              this.name = dataService.user.username;
          }
          
      }
  
      filterQuiz()
      {
          this.quizes = [];
          this.quizesBegin.forEach(quiz => {
              if(quiz.name.toUpperCase().startsWith(this.filter.toUpperCase()))
              {
                  this.quizes.push(quiz);
              }
  
          });
  
      }
       ngOnInit() {
          this.route.params.subscribe((params: Params) => {
              this.testId= params['id'] ; 
              this.age = params['age']
          });
          this.GetCat();
       }
  
       ngOnDestroy()
       {
           this.dataService.user = this.user;
       }
  
        openModal(i:number){
          this.quizes.forEach(element => {
            
            if(element.id == i){
              this.quizdescription = element.description;
              this.quizname = element.name;
            }
          });
              
            
              this.display='block';
          }
  
          onCloseHandled(){
              this.display='none';
          }
  
       GetCat(){
          
          if(this.testId == 0)
          {
              this.getAllQuizes();
          }
       }
  
       getQuizesByCat(quizage:number)
       {
           let minage = 0;
           let maxage=0;
           switch(this.age.toString())
           {
              case "1": maxage=6; minage=0;
              break;
              case "2": minage=7;  maxage=10;
              break;
              case "3": minage=11;  maxage=14;
              break;
              case "4": minage=15;  maxage=19;
              break;
              case "5": minage=20;  maxage=1000;
              break;
  
           }
           if((quizage >= minage|| minage == 0) &&(quizage <=maxage || maxage == 0))
           {
              return true;
           }
           return false;
       }
  
       getAllQuizes()
       {
          this.dataService.getMyQuizes().subscribe(data =>{
          this.quizes = data;
          this.quizesBegin = data;
        });
       }

       delete(id:number)
       {
         this.dataService.deleteQuiz(id).subscribe();
         //this.getQuizById(6);
         this.dataService.deleteQuiz(id).subscribe();
         //this.waitOfDelete(id);

       }

       waitOfDelete(id:number)
       {
          setTimeout(() => {
            if(this.getQuizById(id))
            {
              this.getAllQuizes();
            }
            else{
              this.waitOfDelete(id);
              this.getAllQuizes();
            }
            
        }, 1000/60);

       }

       getQuizById(id:number)
       {
        let q :any;
        this.dataService.getQuiz(id).subscribe(data =>{
           q= data;

        }, error => {
          console.error("error: "+ error)
          if(String(error).includes('404'))
          {
            return false;
          }
        });  
        if(q != undefined)
        {
          return true;
        }
        return false;
       }
  
       navigateToQuizDetail(id: number) {   
  
           switch(this.quizTypeVar )
           {
               case  "qanda":
                   this.router.navigateByUrl("/qanda/"+id);
               case "cloze":
                   this.router.navigateByUrl("/cloze/"+id);  
              case "rightorwrong":
                   this.router.navigateByUrl("/rightorwrong/"+id);  
               case "memory":
                  this.router.navigateByUrl("/memory/"+id);  
              case "multichoice":
                  this.router.navigateByUrl("/multichoice/"+id);  
           }
  
  
    }
  }