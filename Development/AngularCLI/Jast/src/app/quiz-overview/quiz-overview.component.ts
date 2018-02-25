import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { User } from '../model/user.model';
import { Quiz } from '../model/quiz.model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css']
})
export class QuizOverviewComponent  implements OnInit {

 
    quizes: Quiz[];
    user: User;
    name:string = "Kein User";
    testId:number=0;
    age:number=0;
    quizTypeVar: string;
    
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        
        if(dataService.user != null)
        {
            this.user = dataService.user;
            this.name = dataService.user.username;
        }
        
    }


     ngOnInit() {
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.testId=+p);
        this.route.params.switchMap((params: Params) => params['age']).subscribe(p=>this.age=+p);
        this.GetCat();
     }

     ngOnDestroy()
     {
         this.dataService.user = this.user;
     }

     GetCat(){
        
        if(this.testId == 0)
        {
            this.getAllQuizes();
        }
        else{
            this.getQuizesByCat();
            
        }
     }

     getQuizesByCat()
     {
         let minage = 0;
         let maxage=0;
         switch(this.age)
         {
            case 1: maxage=6;
            break;
            case 1: minage=7;  maxage=10;
            break;
            case 1: minage=11;  maxage=14;
            break;
            case 1: minage=15;  maxage=19;
            break;
            case 1: minage=20;  maxage=1000;
            break;

         }
        

       
        this.dataService.getQuizesByCat(this.testId,minage,maxage).subscribe(data =>{
            this.quizes = data;
          });
     }

     getAllQuizes()
     {
        this.dataService.getQuizes().subscribe(data =>{
        this.quizes = data;
      });
     }

     navigateToQuizDetail(id: number) {   

         switch(this.quizTypeVar )
         {
             case  "qanda":
                 this.router.navigateByUrl("/qanda/"+id);
             case "cloze":
                 this.router.navigateByUrl("/cloze/"+id);  
         }


  }
}