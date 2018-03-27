import { Category } from './../../model/category.model';
import { Message } from './../../model/message.model';
import { WebsocketService } from './../websocket-service';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { User } from '../../model/user.model';
import { webSocket } from 'rxjs/observable/dom/webSocket';

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
  messages:Message[]=[];
  header: string;
  category:Category = new Category;

  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute ){
    this.route.params.subscribe((params: Params) => {
        this.catid= params['catid'] ; 
        this.age = params['ageid']
    });
    
    if(dataService.user != null)
    {
        this.theUser = dataService.user;
        this.loadCat();
      
    }
    
    if(this.catid !=0 && this.age !=0)
    {
        console.log("go on");
        this.hide = false;
        if(this.category == undefined)
        {
            this.loadCat();
            this.waitForCat(websocketService);

        }
        else{
             
            this.getChatInfo();
            this.openWebsocket(websocketService);
        }
    }
  }

  waitForCat(websocketService:WebsocketService) {
    setTimeout(() => {
        console.log("wait for cat");
        if(this.category == undefined)
        {
          this.waitForCat(websocketService);
        }
        else
        {
            this.getChatInfo();
            this.openWebsocket(websocketService);
        }
        
    }, 1000);
} 

  loadCat()
  {
    this.dataService.getCatById(Number(this.catid)).subscribe
    (data=>{this.category=data;},
    error=>{alert("Laden der Fragen fehlgeschlagen: "+error)});
  }
  getChatInfo()
  {
   
      this.header= this.category.name+" Chatroom für ";
      console.log("ahe"+ this.age);
      switch(this.age.toString())
      {
        case "1": this.header+="Kinder bis 6 Jahre!"; 
        break;

        case "2": this.header+="7-10 jährige!";
        break;

        case "3": this.header+="10-14 jährige!";
        break;

        case "4": this.header+="0-6 jährige!";
        break;

        case "5": this.header+="User ab 20 Jahre!";
        break;
      }
  }
  openWebsocket(websocketService:WebsocketService){
    this.socket = websocketService.createWebsocket("chatroom"+this.catid+this.age);
  }

  ngOnDestroy()
  {
      this.dataService.user = this.theUser;
      if(this.catid !=0 && this.age !=0 && this.socket != undefined)
      {
      this.socket.complete();}
  }

  ngOnInit(){
      if(this.catid !=0 && this.age !=0){
      this.socket.subscribe(
      message => this.message = message.data
      );}
  }


  send(){
      //this.socket.next(this.dataService.user.username + ": " +this.sentMessage);
  }
}