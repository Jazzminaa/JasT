import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DoCheck } from '@angular/core';
import { Content } from '../../model/content.model';
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

  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute){
      
      if(dataService.user != null)
      {
          this.theUser = dataService.user;
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
      this.route.params.switchMap((params: Params) => params['qid']).subscribe(p=>this.quizId=+p);
      this.socket.subscribe(
      message => this.message = message.data
      );
      this.getMultiplayById();
      this.getContentById();

     
      
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
  send(){
      let num: number =Math.floor(Math.random() * 6) + 1  
      this.message = num+";Alex"+num
    
      /*if (this.contents[2].geloestVon != undefined)
      {
          this.contents[2].geloestVon += "& XY";
      }
      else
      this.contents[2].geloestVon = "gelöst von XY";*/
     // this.socket.next(this.sentMessage);
    }
}