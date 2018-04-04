import { Description } from './../model/description.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { DataService } from '../shared/data.service';
import { Share } from '../model/share.model';
import { Quiz } from '../model/quiz.model';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  
  user:User;
  tips:Description[]=[];
  shared:Share[] = []
  isShare:boolean = true;

  constructor(private dataService:DataService)
  {
    if(dataService.user != null)
    {
        this.user = dataService.user;
    }

    this.getShared(1);
  
   
    /*let d = new Description();
    d.user1 = new User();
    d.quiz = new Quiz();

    d.user1.username = "Sussi";
    d.user1.email = "s@test.com";
    d.quiz.name = "Das/Dass";
    d.reason = "Weil es unverständlich ist";
    d.description ="\"das\" lässt sich im Gedanken immer durch dieses, welches oder jenes ersetzen, ohne dass der Satz seinen Sinn verliert.";
    this.tips.push(d);*/
  }

  getShared(id:number): any {
    this.dataService.getShared(id).subscribe(data =>{
      this.shared = data;
    });
  }

  ngOnInit(){
      
  }
  ngDoCheck(): void {

  }

  ngOnDestroy()
  {
      this.dataService.user = this.user;
  }

}
