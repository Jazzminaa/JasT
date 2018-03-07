import { DataService } from './../shared/data.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { OnInit, Component } from '@angular/core';

@Component(
    {
        selector: 'addswitch',
        template: ' '
    }
)
export class AddSwitch implements OnInit {

    user: User;
    quiztypeid: number;
    quiz:Quiz;
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        if(dataService.user != null)
        {
            this.user = dataService.user;
            this.quiz = dataService.newQuiz;
        }
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.quiztypeid=+p);
        switch(this.quiztypeid)
        {
            case 1:
            router.navigateByUrl("/addquizcontent");
            break;
            case 2:
            router.navigateByUrl("/home");
            break;

        }
    }


     ngOnInit() {
        
        
     }

      ngOnDestroy()
     {
         this.dataService.user = this.user;
         this.dataService.newQuiz = this.quiz;
     }



}