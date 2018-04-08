import { element } from 'protractor';
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

    myturn(): any {
        for(var u=0; u <3;u++)
        {
            for(var o=0;o <=5;o++)
            {
                    this.enableCard[u][o]=false;
            }
        }
    }
  //#region  Variablen game
  contents:Content[];
  contentsmixed:string[]=[];
  row1:string[]=[];
  row2:string[]=[];
  row3:string[]=[];
  row4:string[]=[];
  row5:string[]=[];
  rowContents: string[][] =[[null],[null],[null],[null],[null],[null],[null],[null],[null]];
  rowOfCard1:number;
  colOfCard1:number;
  rowOfCard2:number;
  colOfCard2:number;
  r1:number = 0;
  r2:number = 0;
  content:Content=new Content;
  isTrue:boolean[][]=[[false],[false],[false]];
  enableCard:boolean[][]=[[false],[false],[false]];
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
  reiheOf:number;
  reihe: number;
    //#endregion  
    
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
          this.myturn();
          for(var u=0; u <3;u++)
            {
                for(var o=0;o <=5;o++)
                {
                        this.isTrue[u][o]=false;
                }
            }
        
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
        if(this.numOfPerson == 1)
        {
            this.router.navigateByUrl('/home')
        }
    }

    saveScore() {
    
        this.dataService.insertScore(this.score).subscribe(data => {
        },
        error => {
            //alert("Speichern fehlgeschlagen: " + error);
        });
    }
    checkFinsh()
    {
        let a = true;

        this.isTrue.forEach(element => {
            element.forEach(b => {
                if(!b)
                {
                    a=false;
                }
            });
        });

        if(a)
        {
            this.openModal(0);
        }
    }
  
  ngDoCheck(): void {
    this.checkFinsh();

    if(this.numOfPerson <=1)
    {
        this.openModal(1);
    }
    else{
        this.onCloseHandled();
    }
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
            else if(this.message.includes("memory;"))
            {
                this.contentsmixed = this.message.split(';')[1].split("\"")[0].split(',');
                this.fillCard();
                
            }
            else if(this.message.includes("reihe"))
            {
                if(this.reihe == undefined)
                {
                    this.reihe = 0;
                }
                this.myturn();
                this.reiheOf = Number(this.message.split(';')[1].split("\"")[0]);
                this.message = "add";
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
                  this.reihe = Number(this.message.split(':')[1]);
                  this.message ="add";
            }
            else if(this.message != "add" && !this.message.includes("next")){
                this.myturn();
                if(this.message.includes('open'))
                {
                    let r1 :number = Number(this.data[1].match(/\d+/)[0]);
                        let c1 :number = Number(this.data[2].match(/\d+/)[0]);
                        let r2 :number = Number(this.data[3].match(/\d+/)[0]);
                        let c2 :number = Number(this.data[4].match(/\d+/)[0]);
                        this.enableCard[r1][c1] = true;
                        this.enableCard[r2][c2] = true;
                }
                else if(this.message.includes('close')){
                    let r1 :number = Number(this.data[1].match(/\d+/)[0]);
                        let c1 :number = Number(this.data[2].match(/\d+/)[0]);
                        let r2 :number = Number(this.data[3].match(/\d+/)[0]);
                        let c2 :number = Number(this.data[4].match(/\d+/)[0]);
                        this.enableCard[r1][c1] = false;
                        this.enableCard[r2][c2] = false;
                }
                else{
                            
                    console.log("etwas gelöst");
                    this.data =this.message.split(';');

                    let num:number = Number(this.data[0].match(/\d+/)[0]);
                    console.log(num);
                    for(var e=0; e< this.contents.length;e++)
                    {
                        if(this.contents[e].id == num)
                        {
                            num=e;
                            e=this.contents.length;
                        }
                    }
                    if(this.contents[ Number(num)] != undefined)
                    {
                        
                        this.contents[Number(num)].geloestVon ="Gelöst von: "+ this.data[this.data.length-1];
                        let r1 :number = Number(this.data[1].match(/\d+/)[0]);
                        let c1 :number = Number(this.data[2].match(/\d+/)[0]);
                        let r2 :number = Number(this.data[3].match(/\d+/)[0]);
                        let c2 :number = Number(this.data[4].match(/\d+/)[0]);
                        console.log(r1+"/"+c1+"/"+r2+"/"+c2)
                        this.isTrue[r1][c1] = true;
                        this.isTrue[r2][c2] = true;
                        this.message ="add";
                    }
                }
              
              this.message ="add";
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

  correctGuess(id,r:number,c:number,r2:number,c2:number)
  {

      this.socket.next(id+";"+r+";"+c+";"+r2+";"+c2+";"+this.dataService.user.username);
      this.score.points += 2;
  }

  
  wrongGuess(id:string,r:number,c:number,r2:number,c2:number): any {
    this.socket.next(id+";"+r+";"+c+";"+r2+";"+c2+";"+this.dataService.user.username);
    }


  //#region FillContent
  fillTable()
  {
      if(this.contentsmixed == undefined || this.contentsmixed.length == 0)
      {
            for(var i= 0; i < 15; i++)
            {
                if(this.contents[i] != undefined)
                {
                    this.contentsmixed.push(this.contents[i].input1);
                    this.contentsmixed.push(this.contents[i].input2);

                }
            }
            this.shuffle(this.contentsmixed);
            this.socket.next("memory;"+this.contentsmixed.toString());
            this.fillCard();
    }
    
      
  }  

  fillCard()
  {
    this.row1 =[];
    this.row2 =[];
    this.row3 =[];
    this.row4 =[];
    this.row5 =[];
    for (var i=0; i< this.contentsmixed.length; i+=5) {
        
        if(this.contentsmixed[i] != undefined)
        {
            this.row1.push(this.contentsmixed[i]);
        }
        if(this.contentsmixed[i+1] != undefined)
        {
            
            this.row2.push(this.contentsmixed[i+1]);
        }
        if(this.contentsmixed[i+2] != undefined)
        {
            this.row3.push(this.contentsmixed[i+2]);
        }
        if(this.contentsmixed[i+3] != undefined)
        {
            this.row4.push(this.contentsmixed[i+3]);
        }
        if(this.contentsmixed[i+4] != undefined)
        {
            this.row5.push(this.contentsmixed[i+4]);
        }
    }
    for (var i=0; i< this.row1.length; i++) {
        this.rowContents[0][i] = this.row1[i];
        this.rowContents[1][i] = this.row2[i];
        this.rowContents[2][i] = this.row3[i];
        this.rowContents[3][i] = this.row4[i];
        this.rowContents[4][i] = this.row5[i];
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
    if(this.reiheOf == this.reihe)
    {
        return this.enableCard[row][col];
    }
    return false;
  }

  showContent(row:number,col:number)
  {
      console.log("reihe:"+this.reihe+" == "+this.reiheOf);
      if(this.reihe == this.reiheOf)
      {
        if(!this.isTrue[row][col])
        {
            console.log("Karte zählt");
            if(this.rowOfCard1 == undefined)
            {
                this.myturn();
                this.rowOfCard1 = row;
                this.colOfCard1 = col;
                this.enableCard[row][col] = true;
            }
            else if(this.rowOfCard2 == undefined)
            {

                if(!(this.rowOfCard1 == row && this.colOfCard1 == col))
                {
                    this.rowOfCard2 = row;
                    this.colOfCard2 = col;
                    this.enableCard[row][col] = true;
                    this.proof();
                }
            }
        }
    }
      
  }

  proof() {
      this.checkIfClosed = true;
      this.content = this.getContent();
      if(this.content != undefined)
      {
          this.isTrue[this.rowOfCard1][this.colOfCard1] = true;
          this.isTrue[this.rowOfCard2][this.colOfCard2] = true;
          
          this.correctGuess(this.content.id,this.rowOfCard1,this.colOfCard1,this.rowOfCard2,this.colOfCard2);
          this.rowOfCard1 = undefined;
          this.rowOfCard2 = undefined;
      }
      else{
          this.r1 = this.rowOfCard1;
          this.r2 = this.rowOfCard2;
          this.wrongGuess("open",this.rowOfCard1,this.colOfCard1,this.rowOfCard2,this.colOfCard2);
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
                  this.count = 0;
              }
              this.count++;
          }
          else{
              this.CloseIfNotCLosed();
              this.count = 0;
              return;
          }
          
      }, 1000);
  } 
  CloseIfNotCLosed(): any {
      
      if(this.checkIfClosed)
      {
          console.log("close")
          
          if(this.colOfCard1 != undefined && this.colOfCard2!= undefined)
          {
              this.enableCard[this.r1][this.colOfCard1] = false;
              this.enableCard[this.r2][this.colOfCard2] = false;
              this.socket.next("next");
              this.wrongGuess("close",this.r1,this.colOfCard1,this.r2,this.colOfCard2);
          }
          this.checkIfClosed = false;
      }
  }
      
  getContent():any {
    console.log("content holen");
      for (var i=0; i< this.contents.length; i++) {
          console.log(this.contents[i].input1+" &&"+ this.rowContents[this.rowOfCard1][this.colOfCard1]);
          if((this.contents[i].input1 == this.rowContents[this.rowOfCard1][this.colOfCard1]&& this.contents[i].input2 == this.rowContents[this.rowOfCard2][this.colOfCard2])||(this.contents[i].input2 == this.rowContents[this.rowOfCard1][this.colOfCard1]&& this.contents[i].input1 == this.rowContents[this.rowOfCard2][this.colOfCard2]))
          {
              return this.contents[i];
          }
      }
      return undefined;
  }
  //#endregion


}