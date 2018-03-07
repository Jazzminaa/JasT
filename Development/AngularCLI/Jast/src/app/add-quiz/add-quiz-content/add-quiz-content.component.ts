import { Component, OnInit } from '@angular/core';
import { Content } from '../../model/content.model';
import { DataService } from '../../shared/data.service';
import { Router } from '@angular/router';
import { Quiz } from '../../model/quiz.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-add-quiz-content',
  templateUrl: './add-quiz-content.component.html',
  styleUrls: ['./add-quiz-content.component.css']
})
export class AddQuizContentComponent implements OnInit{

  newContents: Content[] = new Array();
  quiz: Quiz = new Quiz;
  quizes: Quiz [] = [];
  user: User;
  canSave:boolean = false;
  
  constructor(private dataService: DataService,private router: Router) {
      this.user =dataService.user;
      this.getQuiz();
      this.timeout();
  }

  timeout() {
    setTimeout(() => {
        if(this.quiz.id == 0 ||this.quiz.id == undefined || this.quiz == undefined ) 
        {
            console.log("Loading ...");
            this.timeout();
        }
        else{
            this.dataService.newQuiz.id = this.quiz.id;
            this.quiz = this.dataService.newQuiz;
            this.canSave = true;
        }
    }, 1000);
} 


  ngOnInit(): void
  {

  }
  ngOnDestroy()
  {
      this.dataService.user = this.user;
  }

  getQuiz(){
      this.dataService.getQuizWithUserAndName().subscribe(data =>{
      this.quiz = data;
      })
  }

  

  addContentToList(input1: string, input2:string): void
  {
      let content = new Content();
      content.id = 0;
      content.input1 = input1;
      content.input2 = input2;
      content.quiz = this.quiz;
      this.newContents.push(content);
      this.getQuiz();
      this.timeout();

  }

  removeContentFromList(content: Content): void
  {
      let index = this.newContents.indexOf(content);
      this.newContents.splice(index, 1);
  }



  saveContent()
  {
        this.newContents.forEach((content, index) =>{
          content.quiz = this.quiz;
          this.dataService.insertContent(content)
          .subscribe(data => {
          },
          error => {
          //alert("Speichern fehlgeschlagen: " + error);
        })
      });
      this.router.navigateByUrl("/home");
  }

}