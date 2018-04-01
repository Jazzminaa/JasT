import { Component, OnInit } from '@angular/core';
import { Quiz } from '../model/quiz.model';
import { Category } from '../model/category.model';
import { QuizType } from '../model/quiztype.model';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

    newQuiz: Quiz = new Quiz;
    errorText: string;
    categories: Category[] = [];
    quizTypes: QuizType[] = [];
    user: User[] = [];
    hide: Boolean = true;
    private:boolean = true;
    
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
          {this.errorText = "Es müssen alle Daten eingegeben werden!";
          console.log("Es müssen alle Daten eingegeben werden!")}
      else {
          this.errorText = "";
          this.dataService.insertQuiz(this.newQuiz)
            .subscribe(data => {
            },
            error => {
                this.errorText = error;
            
            })
          
            this.dataService.newQuiz = this.newQuiz;
            this.newQuiz = new Quiz();
            this.router.navigateByUrl("/addswitch/"+ this.dataService.newQuiz.quizType.id);
    }
        
    }

}