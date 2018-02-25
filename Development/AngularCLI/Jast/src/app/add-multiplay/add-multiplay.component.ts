import { Component, OnInit } from '@angular/core';
import { Multiplay } from '../model/multiplay.model';
import { Category } from '../model/category.model';
import { QuizType } from '../model/quiztype.model';
import { User } from 'app/model/user.model';
import { Quiz } from '../model/quiz.model';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-add-multiplay',
  templateUrl: './add-multiplay.component.html',
  styleUrls: ['./add-multiplay.component.css']
})
export class AddMultiplayComponent implements OnInit {

  newMultiplay: Multiplay = new Multiplay;
  errorText: string;
  categories: Category[] = [];
  quizTypes: QuizType[] = [];
  users: User[] = [];
  quizes:Quiz[]=[];
  user: User;
  hide: Boolean = true;
  filter:string;
  filtertyp:QuizType;
  filterCat:Category;
  filterAge:number;
  
  constructor(private router: Router, private dataService: DataService)  {
      this.getUsers();
      if(dataService.user != null){
        this.hide = false;
        this.user = dataService.user;
        this.newMultiplay.id = 0;
      }

  }

  ngOnInit() { 
      this.getAllCategories();
      this.getAllQuizTypes();
      this.getAllQuizes();
  }
  getAllQuizes()
  {
      this.dataService.getQuizes().subscribe(data =>{
          this.quizes = data;
        })
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
      this.users = data;
  })
  }

  addMultiplay() {
  /*if (this.newQuiz.name == "" || this.newQuiz.category == null || this.newQuiz.quizType == null || this.newQuiz.age == null || this.newQuiz.description == "")
    this.errorText = "Es müssen alle Daten eingegeben werden!";
  else {
    this.errorText = "";
    this.dataService.insertQuiz(this.newQuiz)
      .subscribe(data => {
      },
      error => {
          
       
      })
      this.dataService.newQuiz = this.newQuiz;
      this.newQuiz = new Quiz();
      
      }*/
  }

}