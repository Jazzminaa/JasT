import { QuizType } from './../model/quiztype.model';
import { Category } from './../model/category.model';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { Content } from './../model/content.model';
import { Score } from './../model/score.model';
import { DataService } from './../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, AfterViewInit, Input, PipeTransform, Pipe } from '@angular/core';
import { WebsocketService } from '../websocket/websocket-service';

@Component({
  selector: 'app-cloze',
  templateUrl: './cloze.component.html',
  styleUrls: ['./cloze.component.css']
})
export class ClozeComponent implements OnInit {

    contents: Content[];
    mixedContents: string[] = [];
    content: Content = new Content;
    correctCounter: number=0;
    wrongCounter: number=0;
    givenUpCounter: number=0;
    actIndex: number=0;
    finalPoints: number=0;
    score: Score;
    user: User;
    display: string;
    quizId: number;
    categoryId: number;
    selQuiz: Quiz;
    selQuizType: QuizType;
    selCategory: Category;
    newString: string = "";
    check:boolean = false;
    randomIndex: number;
  
    openModal(){
        this.display='block';
    }

    onCloseHandled(){
        this.display='none';
    }

    getPoints() {
        this.finalPoints = this.correctCounter*2-this.wrongCounter-this.givenUpCounter*2;
        return this.finalPoints;

    }

    saveScore()
    {
        this.check = true;
        this.getQuizFromContent();
        this.score = new Score();
        this.score.id = 1;
        this.score.points = this.finalPoints;
        
        
        this.dataService.insertScore(this.score).subscribe(data => {
            },
            error => {
                //alert("Speichern fehlgeschlagen: " + error);
            });
        this.display='none';
    }

      loadContent()
    {
      console.log(this.quizId)
      this.dataService.getContentById(this.quizId).subscribe
      (data=>{this.contents=data;},
      error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
    }

    ngOnInit() {
      if(this.contents == undefined)
      {
        this.loadContent();
      }
      
      this.waitForLoading();
      
    }

    waitForLoading() {
      setTimeout(() => {
          if(this.contents == undefined)
          {
            this.waitForLoading();
          }
          else{
           this.mixStrings();
          }
          
      }, 1000);
  } 


    getContent(){
        if(this.contents == undefined)
        {
            this.contents = null;
        }
        else{
            this.content = this.contents[0];
        }
    }



    getQuizFromContent()
    {
    
        this.selQuiz = this.contents[0].quiz;
   
    }

    givenUp(index: number) {
        this.actIndex=index+1;
        this.givenUpCounter++;
    }

    correctGuess(index: number) {
        this.actIndex=index+1;
        this.correctCounter++;
    }

    wrongGuess() {
        this.wrongCounter++;
    }



    constructor(private router: Router, private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute) {
        this.user= this.dataService.user;
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.quizId=+p);
               
    }

    temp(){

       for(var i = 0; i<this.contents.length; i++)
       {
           this.content = this.contents[i];
           this.mixedContents.push(this.content.input2);
       }

     }

      mixStrings() {
      this.temp();
      if(this.mixedContents != undefined){
        var currentIndex = this.mixedContents.length, temporaryValue, randomIndex;
        
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.mixedContents[currentIndex];
            this.mixedContents[currentIndex] = this.mixedContents[randomIndex];
            this.mixedContents[randomIndex] = temporaryValue;
        }
      }
    }


}