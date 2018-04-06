import { Component, OnInit } from '@angular/core';
import { Multiplay } from '../model/multiplay.model';
import { Category } from '../model/category.model';
import { QuizType } from '../model/quiztype.model';
import { User } from 'app/model/user.model';
import { Quiz } from '../model/quiz.model';
import { Router, Params, ActivatedRoute } from '@angular/router';
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
  qid=0;
  canFil = false;
  
  constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute)  {
      this.getUsers();
      if(dataService.user != null){
        this.hide = false;
        this.user = dataService.user;
        this.newMultiplay.id = 0;
        this.canFil = true;
        this.route.params.subscribe(
          (params: Params) => {
              this.qid = params['id'];
              if(this.qid != 0)
              {
                  this.loadQuiz(this.qid);
              }
          }
          );
      }
      else{
        this.router.navigateByUrl("/login")
      }

  }

  loadQuiz(n:number){
    this.dataService.getQuiz(n).subscribe(data=>{
      this.newMultiplay.quiz = data; 
      this.canFil=true;
      this.filterCat = data.category;
      this.filterAge = data.age;
      this.filtertyp = data.quiztype;
    })
  }
  filterQuiz(quiz:Quiz)
  {
    let f = false;
    let c = false;
    let t = false;
    let a = false;
    if(this.filter != undefined && this.filter != ""&& this.filter != " ")
    {
        if(quiz.name.toUpperCase().startsWith(this.filter.toUpperCase()))
        {
            f= true;
        }
    }
    else{
      f=true;
    }
    if(this.filterCat != undefined )
    {
      if(this.filterCat.id == quiz.category.id)
      {
        c=true;
      }
    }
    else{
      c=true;
    }

    if(this.filtertyp != undefined)
    {
      if(this.filtertyp.id == quiz.quiztype.id)
      {
        t=true;
      }
    }
    else{
      t= true;
    }
    if(this.filterAge != undefined )
    {
        switch(this.filterAge.toString())
        {
          case "1": if(quiz.age <= 6){a=true};
          break;
          case "2": if(quiz.age >= 7 && quiz.age <=10){a=true};
          break;
          case "3": if(quiz.age >= 11 && quiz.age <= 14){a=true};
          break;
          case "4": if(quiz.age >= 15 && quiz.age <= 19){a=true};
          break;
          case "5": if(quiz.age >= 20){a=true};
          break;
        }
    }else{
      a= true;
    }
    return f &&c &&t;
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

    
    if(this.newMultiplay.quiz != undefined&& this.newMultiplay.name != undefined && this.newMultiplay.name != "")
    {
      this.dataService.insertMulti(this.newMultiplay)
      .subscribe(data => {
      },
      error => {
          
       
      })
    }
    this.router.navigateByUrl("/home")
  }

}