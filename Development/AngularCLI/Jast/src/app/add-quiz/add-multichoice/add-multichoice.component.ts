import { User } from './../../model/user.model';
import { Quiz } from './../../model/quiz.model';
import { Router } from '@angular/router';
import { DataService } from './../../shared/data.service';
import { Content } from './../../model/content.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-multichoice',
  templateUrl: './add-multichoice.component.html',
  styleUrls: ['./add-multichoice.component.css']
})
export class AddMultichoiceComponent implements OnInit {

  newContents: Content[] = new Array();
  quiz: Quiz = new Quiz;
  quizes: Quiz [] = [];
  user: User;
  canSave:boolean = false;
  content: Content = new Content();
  
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

  
  addQuestionToList(input1: string):void{
     this.content.id = 0;
     this.content.input1 = input1;
     this.content.quiz = this.quiz;
  }

  addFinalContentToList()
  {
    this.newContents.push(this.content);
    this.content = new Content();
  }
  addRightAnswerToList(input2: string):void{
    this.content.input2 += input2 + "/+";
  }
  addWrongAnswerToList(input2: string):void{
    this.content.input2 += input2 + "/-";
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
