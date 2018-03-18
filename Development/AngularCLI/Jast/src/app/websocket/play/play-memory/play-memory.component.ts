import { Component, OnInit, DoCheck } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Content } from '../../../model/content.model';
import { Multiplay } from '../../../model/multiplay.model';
import { User } from '../../../model/user.model';
import { DataService } from '../../../shared/data.service';
import { WebsocketService } from '../../websocket-service';

@Component({
  selector: 'app-play-memory',
  templateUrl: './play-memory.component.html',
  styleUrls: ['./play-memory.component.css']
})
export class PlayMemoryComponent implements OnInit {
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
      console.log("Memory")
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
    console.log("r");
      this.socket.next(i+";"+this.dataService.user.username);
  }

}