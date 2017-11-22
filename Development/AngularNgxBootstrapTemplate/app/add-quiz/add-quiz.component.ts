import { QuizType } from './../model/quiztype.model';
import { Category } from './../model/category.model';
import { DataService } from './../shared/data.service';
import { Quiz } from './../model/quiz.model';
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component(
    {
        selector: 'add-quiz',
        templateUrl: 'app/add-quiz/add-quiz.component.html'
    }
)
export class AddQuizComponent implements OnInit {

    newQuiz: Quiz = new Quiz;
    errorText: string;
    categories: Category[] = [];
    quizTypes: QuizType[] = [];
    
    constructor(private router: Router, private dataService: DataService)  {

    }

    ngOnInit() {
        this.getAllCategories();
        this.getAllQuizTypes();
    }

    getAllCategories(){
      this.dataService.getCategories().subscribe(data =>{
        this.categories = data;
      })
    }

    getAllQuizTypes(){
        this.dataService.getQuizTypes().subscribe(data =>{
        this.quizTypes = data;
      })
    }

    addQuiz() {
    if (this.newQuiz.name == "" || this.newQuiz.category == null || this.newQuiz.quizType == null || this.newQuiz.age == null || this.newQuiz.description == "")
      this.errorText = "Es müssen alle Daten eingegeben werden!";
    else {
      this.errorText = "";
      this.dataService.insertQuiz(this.newQuiz)
        .subscribe(data => {
        },
        error => {
          alert("Speichern fehlgeschlagen: " + error);
        })

      this.newQuiz = new Quiz();
    }
  }


}