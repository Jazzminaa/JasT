import { Quiz } from './../model/quiz.model';
import { DataService } from './../shared/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component(
    {
        selector: 'quiz-overview',
        templateUrl: 'app/quiz-overview/quiz-overview.component.html'
    }
)
export class QuizOverviewComponent implements OnInit {

    quizes: Quiz[];
    
    constructor(private router: Router, private dataService: DataService)  {

    }

     ngOnInit() {
         this.getAllQuizes();
     }

     getAllQuizes()
     {
        this.dataService.getQuizes().subscribe(data =>{
        this.quizes = data;
      })
     }

     navigateToQuizDetail(id: number) {
      this.router.navigate(['/qanda', id]);
  }
}