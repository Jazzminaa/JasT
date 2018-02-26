import { Content } from './../../model/content.model';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DoCheck } from '@angular/core';
import { Multiplay } from '../../model/multiplay.model';
import { User } from '../../model/user.model';
import { DataService } from '../../shared/data.service';
import { WebsocketService } from '../websocket-service';

@Component({
  selector: 'play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements  OnInit{
  private data: string[];

  private socket: Subject<any>;
  private counterSubscription: Subscription;
  private message: string;
  private sentMessage: string;
  num: number;
  quizId: number;
  contents: Content[];
  multiplayId: number;
  multiplay: Multiplay;
  theUser:User;
  isQandA:boolean=false;
  isCloze:boolean=false;

  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute){
      
      if(dataService.user != null)
      {
          this.theUser = dataService.user;
          this.route.params.switchMap((params: Params) => params['qid']).subscribe(p=>this.quizId=+p);
          this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.multiplayId=+p);
      }
      else{
          this.router.navigateByUrl("/login");
      }
    

      if(this.multiplayId != undefined)
      {
          this.socket = websocketService.createWebsocket(this.multiplayId);
        
      }
     

  }

  ngDoCheck(): void {
      if(this.contents  != undefined)
      {
          if(this.message != undefined)
          {
              this.data =this.message.split(';');
              if(this.data[1]!= undefined)
              {
                  
                  this.data[1] = this.data[1].substring(0, this.data[1].length - 1);
              }
              let num:number = Number(this.data[0].match(/\d+/)[0]);
              if(this.contents[ Number(num)] != undefined)
              {
                  
                  this.contents[Number(num)].geloestVon ="Gelöst von: "+ this.data[1];
                  
              }
          }
          
      }
      
  }
  ngOnDestroy()
  {
      this.dataService.user = this.theUser;
  }

  ngOnInit(){
        this.getMultiplayById();
        this.getContentById();    
      this.socket.subscribe(
      message => this.message = message.data
      );  

  }

  check(con:Content)
  {
    if(con != undefined)
    {
        console.log(con.id)
        switch(con.quiz.quizType.id)
        {
            case 1 : this.isQandA = true;
            break;
        }
    }
    return false;
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
  }

}