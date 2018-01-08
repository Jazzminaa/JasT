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

    constructor(private dataService: DataService, websocketService: WebsocketService){
        this.socket = websocketService.createWebsocket();
    }

    ngOnInit(){
        this.socket.subscribe(
        message => this.message = message.data
        );
    }

    private launchCounter(){ 
    //Counter already initialized
        if(this.counterSubscription){
            this.counterSubscription.unsubscribe();
        }
        //let counter = Observable.interval(1000);
        let counter = Observable.interval(5);
        this.counterSubscription = counter.subscribe(
            num => {
                this.sentMessage = 'Websocket Message '+ num;
                this.socket.next(this.sentMessage);
            }
        );
    }

    send(){
        this.socket.next(this.sentMessage);
    }
}