import { Quiz } from './../model/quiz.model';
import { DataService } from './../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { User } from '../model/user.model';


@Component(
    {
        selector: 'quiz-overview',
        templateUrl: 'app/quiz-overview/quiz-overview.component.html'
    }
)
export class QuizOverviewComponent implements OnInit {

    quizes: Quiz[];
    user: User;
    name:string = "Kein User";
    testId:number=0;
    
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        
        if(dataService.user != null)
        {
            this.user = dataService.user;
            this.name = dataService.user.username;
        }
    }


     ngOnInit() {
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.testId=+p);
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
        this.dataService.getQuizesByCat(this.testId).subscribe(data =>{
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
      this.router.navigate(['/qanda', id]);
  }
}