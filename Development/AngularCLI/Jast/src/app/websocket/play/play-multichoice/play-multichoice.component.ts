import { Score } from './../../../model/score.model';
import { Message } from './../../../model/message.model';
import { Component, OnInit, AfterViewInit, Input, PipeTransform, Pipe, DoCheck } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Content } from '../../../model/content.model';
import { Multiplay } from '../../../model/multiplay.model';
import { User } from '../../../model/user.model';
import { DataService } from '../../../shared/data.service';
import { WebsocketService } from '../../websocket-service';

@Component({
  selector: 'app-play-multichoice',
  templateUrl: './play-multichoice.component.html',
  styleUrls: ['./play-multichoice.component.css']
})
export class PlayMultichoiceComponent implements OnInit {
    private data: string[];

    private socket: Subject<any>;
    private counterSubscription: Subscription;
    private message: string;
    numOfPerson: number = 0;
    score:Score;
    quizId: number;
    contents: Content[];
    multiplayId: number;
    multiplay: Multiplay;
    theUser:User;
    messages:Message[]=[];
    private sendMessage: string;
    checkAnswer:boolean[]=[];
    
    isfinish: boolean = false;
    display: string;

    header = "Dein Punktestand";
    con = "Du hast {{score?.points}} Punkte erreicht!";
    buttonText = "Speichern";
  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute){
      
      if(dataService.user != null)
      {
          this.theUser = dataService.user;
          this.route.params.subscribe(
            (params: Params) => {
                this.quizId = params['qid'];
                this.multiplayId = params['id'];
            }
            );

            this.score = new Score();
            this.score.points=0;
            this.score.id = 0;
            this.score.playDay =  new Date();
            this.score.user = this.theUser;
      }
      else{
          this.router.navigateByUrl("/login");
      }
    
      

      if(this.multiplayId != undefined)
      {
          this.socket = websocketService.createWebsocket(this.multiplayId.toString());
        
      }
     

  }

    openModal(i:number){
        this.display='block';
        this.score.quiz = this.contents[0].quiz;
        
        
        if(i= 0)
        {
            this.header = "Dein Punktestand";
            this.con = "Du hast "+this.score.points+"Punkte erreicht!";
            this.buttonText = "Speichern";
        }
        else{
            this.header ="Warten";
            this.con = "Warte auf einen weitern Spieler!";
            this.buttonText = "Schließen";
        }
    }

    onCloseHandled(){
        this.display='none';
        this.saveScore();
        this.router.navigateByUrl('/home')
    }

    saveScore()
    {
    
        this.dataService.insertScore(this.score).subscribe(data => {
        },
        error => {
            //alert("Speichern fehlgeschlagen: " + error);
        });
    }
 

  ngDoCheck(): void {
    if(this.numOfPerson <=1)
    {
        //this.openModal(1);
    }
    else{
        this.onCloseHandled();
    }
    if(this.contents  != undefined && !this.isfinish)
    {
        if(this.message != undefined)
        {
            if(this.message.includes("message") && this.message != "add")
            {
              this.data=this.message.split(';');
              let m : Message = new Message;
              m.name = this.data[1];
              m.message = this.data[2].split('"')[0];
              this.messages.push(m);
              this.message ="add";
            }
            else if(this.message.includes('+'))
            {
                  this.numOfPerson++;
                  this.message ="add";
            }
            else if(this.message.includes('-'))
            {
                  this.numOfPerson--;
                  this.message ="add";
            }
            else if(this.message.includes('num'))
            {
                  this.numOfPerson= Number(this.message.split(':')[1]);
                  this.message ="add";
            }
            else if (this.message !="add" &&!this.message.includes('reihe')){
              this.data =this.message.split(';');
              if(this.data[1]!= undefined)
              {
                  this.data[1] = this.data[1].substring(0, this.data[1].length - 1);
              }
              let num:number = Number(this.data[0].match(/\d+/)[0]);
              console.log(num);
              if(this.contents[ Number(num)] != undefined)
              {
                  
                  this.contents[Number(num)].geloestVon ="Gelöst von: "+ this.data[1];
                  if(this.contents.length != 0)
                  {
                    this.isfinish = true;
                    let n = 0;
                    while(this.isfinish && n < this.contents.length)
                    {
                        if(this.contents[n].geloestVon == null || this.contents[n].geloestVon == undefined)
                        {
                            this.isfinish = false;
                        }
                        n++;
                    }
                    if(this.isfinish)
                    {
                        this.openModal(0);
                    }
                    }
                  
              }
            }

        }
        
    }
    
}

send(){
  this.socket.next("message;"+this.dataService.user.username + ";" +this.sendMessage);
  this.sendMessage = "";
  }
  ngOnDestroy()
  {
      this.dataService.user = this.theUser;
      if(this.socket != undefined)
      {
         this.socket.complete();
      }
  }

  ngOnInit(){
        this.getMultiplayById();
        this.getContentById();    
      this.socket.subscribe(
      message => this.message = message.data
      );  

  }

  getMultiplayById()
  {
      this.dataService.getMultiplayById(this.multiplayId).subscribe
          (data=>{this.multiplay=data;},
          error=>{alert(error)});
  }
  getContentById()
  {
      this.dataService.getContentById(this.quizId).subscribe
      (data=>{this.contents=data;},
      error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})

      if(this.contents.length !=0)
      {
          this.contents.forEach(element => {
              this.checkAnswer[element.id] = false;
          });
      }

  }

  correctGuess(i:number)
  {
      console.log(i)
      this.socket.next(i+";"+this.dataService.user.username);
      this.score.points += 2;
  }

  check(i:number)
  {
      this.checkAnswer[i]= true;
  }
  

}