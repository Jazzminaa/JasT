import { User } from 'app/model/user.model';
import { Content } from './../model/content.model';
import { Quiz } from './../model/quiz.model';
import { Score } from './../model/score.model';
import { WebsocketService } from './../websocket/websocket-service';
import { DataService } from './../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multichoice',
  templateUrl: './multichoice.component.html',
  styleUrls: ['./multichoice.component.css']
})
export class MultichoiceComponent implements OnInit {

        contents: Content[];
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
        content: Content = new Content;
        newString: string;
        checkAnswer: boolean = false;
        
        check()
        {
            this.checkAnswer = true;
        }

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

        ngOnInit(): void {
       
            if(this.contents == undefined)
            {
                this.loadContent();
            }         
                
         }

       

         getQuizFromContent()
         {
        
            this.selQuiz = this.contents[0].quiz;
         }

        correctGuess(index: number) {
            this.actIndex=index+1;
            this.correctCounter++;
        }

        wrongGuess() {
            this.wrongCounter++;
        }

        loadContent()
        {
            this.dataService.getContentById(this.quizId).subscribe
                (data=>{this.contents=data;},
                error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
        }
    

        constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute) {
             this.user= this.dataService.user;
             this.route.params.subscribe(
                (params: Params) => {
                    this.quizId = params['id'];
                }
                );
             this.loadContent();
        }

}
