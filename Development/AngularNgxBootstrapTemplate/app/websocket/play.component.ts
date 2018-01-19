import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocketServices.component';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'play',
    templateUrl : 'app/websocket/play.component.html',
  })
  export class PlayComponent  implements OnInit{

    private socket: Subject<any>;
    private counterSubscription: Subscription;
    private message: string;
    private sentMessage: string;
    num: number;

    constructor(private dataService: DataService, websocketService: WebsocketService){
        this.num = Math.floor(Math.random() * 3) + 1 ;
        //this.num = 1;
        this.socket = websocketService.createWebsocket(this.num);
    }

    ngOnInit(){
        this.socket.subscribe(
        message => this.message = message.data
        );
    }

    send(){
        this.socket.next(this.sentMessage +"<br>");
    }
}