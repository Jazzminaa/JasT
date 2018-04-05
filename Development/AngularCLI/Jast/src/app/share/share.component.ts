import { Quiz } from './../model/quiz.model';
import { Share } from './../model/share.model';
import { User } from './../model/user.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  user:User;
  shareQuiz:Share = new Share();
  login:boolean = false;
  reguser:User[]=[];
  quizId=0;
  quiz:Quiz;
  filter:string;
  constructor(private router: Router,private dataService:DataService,private route: ActivatedRoute)
  {
    if(dataService.user != null)
    {
        this.user = dataService.user;
        this.shareQuiz.user1 = dataService.user;
        this.loadUser();

        this.route.params.subscribe(
          (params: Params) => {
              this.quizId = params['id'];
              this.loadQuiz(this.quizId)
          }
          );

    }
    else{
      this.login=true;
      this.router.navigateByUrl("\login");
    }
  }

  loadUser()
  {
    this.dataService.getUsers().subscribe
    (data=>{this.reguser=data;},
    error=>{});

  }
  loadQuiz(q:number)
  {

    this.dataService.getQuiz(q).subscribe(data=>{this.shareQuiz.quiz=data;},
      error=>{})
  }

  share(i:number)
  {

      this.shareQuiz.user2 = this.reguser[i];

      this.dataService.insertShare(this.shareQuiz).subscribe(data => {
      },
      error => {
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
