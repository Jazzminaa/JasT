import { Category } from './../../model/category.model';
import { Message } from './../../model/message.model';
import { WebsocketService } from './../websocket-service';
import { Component, OnInit, DoCheck } from '@angular/core';
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
  private sendMessage: string;

  theUser:User;
  catid:number=0;
  age:number=0;
  messages:Message[]=[];
  header: string;
  category:Category;
  private data: string[];

  constructor(private router: Router,private dataService: DataService, websocketService: WebsocketService,private route: ActivatedRoute ){
    this.route.params.subscribe((params: Params) => {
        this.catid= params['catid'] ; 
        this.age = params['ageid']
    });
    if(this.catid == 0 || this.age == 0)
    {
        this.dataService.error = "Suchen Sie zuerst in der Menüzeile einen Chat aus, mithilfe von den Filtern! Katergorie und Alter dürfen nicht 0 sein;";
        this.router.navigateByUrl("/home");
    }
    if(dataService.user != null)
    {
        this.theUser = dataService.user;
        this.loadCat();
      
    }
    if(this.catid !=0 && this.age !=0)
    {
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
    );
  }

  getChatInfo()
  {
   
      this.header= this.category.name+" Chatroom für ";
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
    this.socket = websocketService.createWebsocket("chatroomCat"+this.catid+"Age"+this.age);

    this.socket.subscribe(
        message => this.message = message.data
        ); 
  }

  ngOnDestroy()
  {
      this.dataService.user = this.theUser;
      if(this.catid !=0 && this.age !=0 && this.socket != undefined)
      {
      this.socket.complete();}
  }

  ngOnInit(){
     
  }

  ngDoCheck(): void {
        if(this.message != undefined && this.message != "add"  && this.message.startsWith("\"message"))
        {
            this.data=this.message.split(';');
            let m : Message = new Message;
            m.name = this.data[1];
            m.message = this.data[2].split('"')[0];
            this.messages.push(m);
            this.message ="add";
        }       
    }


  send(){
      this.socket.next("message;"+this.dataService.user.username + ";" +this.sendMessage);
      this.sendMessage = "";
  }
}