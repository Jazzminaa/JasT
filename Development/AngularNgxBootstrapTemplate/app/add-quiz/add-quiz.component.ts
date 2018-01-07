import { User } from './../model/user.model';
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
    user: User[] = [];
    hide: Boolean = true;
    
    constructor(private router: Router, private dataService: DataService)  {
        this.getUsers();
        if(dataService.user != null){
          this.hide = false;
          this.newQuiz.user = dataService.user;
          this.newQuiz.id = 0;
        }

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

    getUsers(){
        this.dataService.getUsers().subscribe(data =>{
        this.user = data;
    })
    }

    addQuiz() {
    if (this.newQuiz.name == "" || this.newQuiz.category == null || this.newQuiz.quizType == null || this.newQuiz.age == null || this.newQuiz.description == "")
      this.errorText = "Es müssen alle Daten eingegeben werden!";
    else {
      this.errorText = "";
      /*this.dataService.insertQuiz(this.newQuiz)
        .subscribe(data => {
        },
        error => {
         
        })*/
        this.dataService.newQuiz = this.newQuiz;
        this.newQuiz = new Quiz();
        
        }
    }

}