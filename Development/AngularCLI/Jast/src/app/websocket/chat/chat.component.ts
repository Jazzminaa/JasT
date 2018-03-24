import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { WebsocketService } from '../websocket-service';
import { User } from '../../model/user.model';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  private socket: Subject<any>;
  private counterSubscription: Subscription;
  private message: string;
  private sentMessage: string;
  num: number;
  theUser:User;
  catid:number=0;
  age:number=0;
  hide:boolean=true;
  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute ){
    this.route.params.subscribe((params: Params) => {
        this.catid= params['catid'] ; 
        this.age = params['ageid']
    });

    if(dataService.user != null)
    {
        this.theUser = dataService.user;
    }
    
    if(this.catid !=0 && this.age !=0)
    {
        this.hide = !this.hide;
        this.openWebsocket(websocketService);
    }
  }

  openWebsocket(websocketService:WebsocketService){
    this.socket = websocketService.createWebsocket("chatroom"+this.catid+this.age);
  }
  ngOnDestroy()
  {
      this.dataService.user = this.theUser;
  }

  ngOnInit(){
      this.socket.subscribe(
      message => this.message = message.data
      );
  }


  send(){
      this.socket.next(this.dataService.user.username + ": " +this.sentMessage);
  }
}