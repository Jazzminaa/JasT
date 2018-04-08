import { Quiz } from './../model/quiz.model';
import { QuizType } from './../model/quiztype.model';
import { Category } from './../model/category.model';
import { WebsocketService } from './../websocket/websocket-service';
import { OnInit, Component, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router,ActivatedRoute, Params  } from '@angular/router';
import { Content } from '../model/content.model';
import { Score } from '../model/score.model';
import { User } from '../model/user.model';

@Component({
  selector: 'qanda',
  templateUrl: './qanda.component.html',
  styleUrls: ['./qanda.component.css']
})
export class QandaComponent  implements OnInit {
       
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
        selQuizType: QuizType;
        selCategory: Category;

        openModal(){
            this.saveScore();
            this.display='block';
        }

        onCloseHandled(){
            
            this.display='none';
            this.router.navigateByUrl('/home');
        }

        getPoints() {
        this.finalPoints = this.correctCounter*2-this.wrongCounter-this.givenUpCounter*2;
        return this.finalPoints;
        }
    
        saveScore()
        { 
            this.getQuizFromContent();
            this.score = new Score();
            this.score.id = 0;
            this.score.user = this.user;
            this.score.quiz = this.selQuiz;
            this.score.points = this.finalPoints;
            if(this.score.quiz == undefined)
            {
                this.score.quiz = this.contents[1].quiz;
            }
            this.score.user = this.user;

           if(this.user != undefined)
           {
                this.dataService.insertScore(this.score).subscribe(data => {
                    },
                    error => {
                        //alert("Speichern fehlgeschlagen: " + error);
                    });
            }
            
            this.display='block';
            
        }

        ngOnInit(): void {
            this.dataService.getContentById(this.quizId).subscribe
            (data=>{this.contents=data;},
            error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
            
         }

         getQuizFromContent()
         {
        
            this.selQuiz = this.contents[1].quiz;
            this.selQuizType = this.contents[1].quiz.quiztype;
            this.selCategory = this.contents[1].quiz.category;
         
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


        constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute) {
             this.user= this.dataService.user;
             this.route.params.subscribe((params: Params) => {
            
                this.quizId= params['id'] ;
          });
        }
}