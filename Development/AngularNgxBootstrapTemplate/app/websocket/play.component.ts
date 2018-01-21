import { Multiplay } from './../model/multiplay.model';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocketServices.component';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Content } from '../model/content.model';
import { User } from '../model/user.model';

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
    quizId: number;
    contents: Content[];
    multiplayId: number;
    multiplay: Multiplay;
    user:User;

    constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute){
        this.socket = websocketService.createWebsocket(this.multiplayId);
    }

    ngOnInit(){
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.multiplayId=+p);
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

    send(){
        this.socket.next(this.sentMessage);
    }
}