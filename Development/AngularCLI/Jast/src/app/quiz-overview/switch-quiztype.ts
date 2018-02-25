import { DataService } from './../shared/data.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { OnInit, Component } from '@angular/core';

@Component(
    {
        selector: 'switch',
        template: ' '
    }
)
export class SwitchComponent implements OnInit {

    user: User;
    quizid: number;
    quiztypeid: number;
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.quizid=+p);
        
        this.route.params.switchMap((params: Params) => params['qid']).subscribe(p=>this.quiztypeid=+p);
        switch(this.quiztypeid)
        {
            case 1:
            router.navigateByUrl("/qanda/"+this.quizid);
            break;
            case 2:
            router.navigateByUrl("/cloze/"+this.quizid);
            break;

        }
    }


     ngOnInit() {
        
        
     }

      ngOnDestroy()
     {
         this.dataService.user = this.user;
     }



}