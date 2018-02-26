import { DataService } from './../shared/data.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Quiz } from './../model/quiz.model';
import { User } from './../model/user.model';
import { OnInit, Component } from '@angular/core';

@Component(
    {
        selector: 'multiswitch',
        template: ' '
    }
)
export class Multiswitch implements OnInit {

    user: User;
    mquizid: number;
    quizid: number;
    quiztypeid: number;
    constructor(private router: Router, private dataService: DataService,private route: ActivatedRoute )  {
        if(dataService.user != null)
        {
            this.user = dataService.user;
        }
        this.route.params.switchMap((params: Params) => params['id']).subscribe(p=>this.mquizid=+p);
        this.route.params.switchMap((params: Params) => params['qtid']).subscribe(p=>this.quiztypeid=+p);
        this.route.params.switchMap((params: Params) => params['qid']).subscribe(p=>this.quizid=+p);
        switch(this.quiztypeid)
        {
            case 1:
            router.navigateByUrl("/multiqanda/"+this.mquizid+"/"+this.quizid);
            break;
            case 2:
            router.navigateByUrl("/multicloze/"+this.mquizid+"/"+this.quizid);
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