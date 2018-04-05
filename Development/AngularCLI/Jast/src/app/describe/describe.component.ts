import { Description } from './../model/description.model';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-describe',
  templateUrl: './describe.component.html',
  styleUrls: ['./describe.component.css']
})
export class DescribeComponent implements OnInit {
  user:User;
  tip:Description =new Description();
  quizId = 0;

  constructor(private router: Router,private dataService:DataService,private route: ActivatedRoute)
  {
    if(dataService.user != null)
    {
        this.user = dataService.user;
        this.tip.user1 = dataService.user;

        this.route.params.subscribe(
          (params: Params) => {
              this.quizId = params['id'];
              this.loadQuiz(this.quizId)
          }
          );

    }
    else{
      this.router.navigateByUrl("\login");
    }
  }

  loadQuiz(q:number)
  {

    this.dataService.getQuiz(q).subscribe(data=>{this.tip.quiz=data;},
      error=>{})
  }

  senden()
  {
    if(this.tip.description != undefined && this.tip.reason != undefined)
    {
      this.dataService.inserDesc(this.tip).subscribe(data => {
      },
      error => {
      });
    }
    else{
      alert("Änderungsvorschlag eintragen und Grund angeben!");
    }
      
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
