import { Description } from './../model/description.model';
import { Component, OnInit, AfterViewInit, Input, PipeTransform, Pipe, DoCheck } from '@angular/core';
import { User } from '../model/user.model';
import { DataService } from '../shared/data.service';
import { Share } from '../model/share.model';
import { Quiz } from '../model/quiz.model';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  
  user:User;
  tips:Description[]=[];
  shared:Share[] = []
  isShared:Boolean = true;
  display: string='none';
  header:string;
  content:string;


  constructor(private router: Router,private dataService:DataService,private route: ActivatedRoute)
  {
    if(dataService.user != null)
    {
        this.user = dataService.user;

        this.loadShared(this.user.id);
        this.loadDesc(this.user.id);

    }
    else{
      this.router.navigateByUrl("\login");
    }
  }

  use(i:number)
  {
      this.tips[i].quiz.description = this.tips[i].description;

      this.dataService.updateQuiz(this.tips[i].quiz).subscribe();
  }

  openModal(i:number,id:number){
    switch(i)
    {
      case 0: this.header="Information"; this.content = this.shared[id].quiz.description;
      break;

      case 1: this.header="Grund"; this.content = this.tips[id].description;
      break;

      case 2: this.header="Änderungsvorschlag"; this.content = this.tips[id].reason;
      break;
    }
          
        this.display='block';
    }

    onCloseHandled(){
        this.display='none';
    }

  
  loadShared(id:number): any {
    this.dataService.getShared(id).subscribe(data =>{
      this.shared = data;
    });
  }

  loadDesc(id:number): any {
    this.dataService.getDesc(id).subscribe(data =>{
      this.tips = data;
    });
  }

  change()
  {
    if(this.isShared)
    {
      this.isShared = false;
    }
    else
    {this.isShared = true;}
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
