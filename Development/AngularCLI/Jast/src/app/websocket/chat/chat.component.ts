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
  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService){
      this.socket = websocketService.createWebsocket(0);

    if(dataService.user != null)
    {
        this.theUser = dataService.user;
    }
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