import { Component, OnInit, AfterViewInit, Input, PipeTransform, Pipe, DoCheck } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Content } from '../../../model/content.model';
import { Multiplay } from '../../../model/multiplay.model';
import { User } from '../../../model/user.model';
import { DataService } from '../../../shared/data.service';
import { WebsocketService } from '../../websocket-service';
import { Score } from '../../../model/score.model';
import { Message } from 'app/model/message.model';

@Component({
  selector: 'app-play-memory',
  templateUrl: './play-memory.component.html',
  styleUrls: ['./play-memory.component.css']
})
export class PlayMemoryComponent implements OnInit {

    myturn: number;
  //#region  Variablen game
  contents:Content[];
  contentsmixed:string[]=[];
  row1:string[]=[];
  row2:string[]=[];
  row3:string[]=[];
  rowContents: string[][] =[[null],[null],[null],[null],[null],[null],[null],[null],[null]];
  rowOfCard1:number;
  colOfCard1:number;
  rowOfCard2:number;
  colOfCard2:number;
  r1:number = 0;
  r2:number = 0;
  content:Content=new Content;
  isTrue:boolean[][]=[[false],[false],[false],[false],[false],[false],[false],[false],[false]];
  enableCard:boolean[][]=[[false],[false],[false],[false],[false],[false],[false],[false],[false]];
  count:number = 0;
  checkIfClosed:boolean = false;
  user:User;
  quizId: number;
  duration:number= 90;
  clockDisplay : string; 
  interval: number;
  
  display: string;
  //#endregion
  //#region Variablen standard
  private data: string[];

  private socket: Subject<any>;
  private counterSubscription: Subscription;
  private message: string;
  numOfPerson: number = 0;
  score:Score;
  multiplayId: number;
  multiplay: Multiplay;
  theUser:User;
  messages:Message[]=[];
  private sendMessage: string;
    
  isfinish: boolean = false;
    //#endregion    
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

    openModal(){
        this.display='block';
        this.score.quiz = this.contents[0].quiz;
    }

    onCloseHandled(){
        this.display='none';
        console.log(this.score.getJson());
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
    if(this.contents  != undefined)
    {
        if(this.message != undefined)
        {
            console.log(this.message)
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
                  this.myturn = Number(this.message.split(':')[1]);
                  this.message ="add";
            }
            else{
              this.data =this.message.split(';');
              if(this.data[1]!= undefined)
              {
                  
                  this.data[1] = this.data[1].substring(0, this.data[1].length - 1);
              }
              let num:number = Number(this.data[0].match(/\d+/)[0]);
              if(this.contents[ Number(num)] != undefined)
              {
                  
                  this.contents[Number(num)].geloestVon ="Gelöst von: "+ this.data[1];
                  this.message ="add";
                  
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
        else if(this.contents.length != 0){
          this.shuffle(this.contents)
          this.fillTable();
        }
        
    }, 1000);
    }
  loadContent()
    {
      console.log(this.quizId)
      this.dataService.getContentById(this.quizId).subscribe
      (data=>{this.contents=data;},
      error=>{alert("Laden der Fragen fehlgeschlagen: "+error)})
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

  }

  correctGuess(i:number)
  {
      this.socket.next(i+";"+this.dataService.user.username);
      this.score.points += 2;
  }


  //#region FillContent
  fillTable()
  {
      for(var i= 0; i < 9; i++)
      {
          this.contentsmixed.push(this.contents[i].input1);
          this.contentsmixed.push(this.contents[i].input2);
      }
      this.shuffle(this.contentsmixed);
      for (var i=0; i< this.contentsmixed.length; i+=3) {
           this.row1.push(this.contentsmixed[i]);
           this.row2.push(this.contentsmixed[i+1]);
           this.row3.push(this.contentsmixed[i+2]);
      }
      for (var i=0; i< this.row1.length; i++) {
          this.rowContents[0][i] = this.row1[i];
          this.rowContents[1][i] = this.row2[i];
          this.rowContents[2][i] = this.row3[i];
      }

      
  }  
                    
  shuffle(array:any[]) {
    if(array != undefined){
      var currentIndex = array.length, temporaryValue, randomIndex;
      
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
    }
      return array;
  }
  //#endregion                      
  //#region  Game
  checkBoolean(row:number,col:number)
  {
      if(this.isTrue[row][col])
      {
          return this.isTrue[row][col];
      }
      return this.enableCard[row][col];
  }

  showContent(row:number,col:number)
  {
      if(!this.isTrue[row][col])
      {
          this.enableCard[row][col] = true;
          this.CloseIfNotCLosed();
          if(this.rowOfCard1 == undefined)
          {
              this.rowOfCard1 = row;
              this.colOfCard1 = col;
          }
          else if(this.rowOfCard2 == undefined)
          {

              if(!(this.rowOfCard1 == row && this.colOfCard1 == col))
              {
                  this.rowOfCard2 = row;
                  this.colOfCard2 = col;
                  this.proof();
              }
          }
      }
      
  }

  proof() {
      this.checkIfClosed = true;
      this.content = this.getContent();
      if(this.content.input2 == this.rowContents[this.rowOfCard2][this.colOfCard2])
      {
          this.isTrue[this.rowOfCard1][this.colOfCard1] = true;
          this.isTrue[this.rowOfCard2][this.colOfCard2] = true;
          console.log(this.rowContents[this.rowOfCard1][this.colOfCard1]+"&& " +this.rowContents[this.rowOfCard2][this.colOfCard2]);
          this.rowOfCard1 = undefined;
          this.rowOfCard2 = undefined;
      }
      else{
          this.r1 = this.rowOfCard1;
          this.r2 = this.rowOfCard2;
          this.rowOfCard1 = undefined;
          this.rowOfCard2 = undefined;
          this.timeout();
      }

  }

  timeout() {
      setTimeout(() => {
          console.log(this.checkIfClosed)
          if(this.rowOfCard1 == undefined)
          {
              if(this.count < 3)
              {
                  console.log("Loading....")
                  this.timeout();
              }
              else{
                  this.CloseIfNotCLosed();
                  this.checkIfClosed = false;
                  this.count = 0;
              }
              this.count++;
          }
          else{
              this.CloseIfNotCLosed();
              this.checkIfClosed = false;
              this.count = 0;
              return;
          }
          
      }, 1000);
  } 
  CloseIfNotCLosed(): any {
      
      if(this.checkIfClosed)
      {
          console.log("Close")
          if(this.colOfCard1 != undefined && this.colOfCard2!= undefined)
          {
              this.enableCard[this.r1][this.colOfCard1] = false;
              this.enableCard[this.r2][this.colOfCard2] = false;
          }
          this.checkIfClosed = false;
      }
  }
      
  getContent():any {
      for (var i=0; i< this.contents.length; i++) {
          if(this.contents[i].input1 == this.rowContents[this.rowOfCard1][this.colOfCard1])
          {
              return this.contents[i];
          }
      }

  }
  //#endregion


}