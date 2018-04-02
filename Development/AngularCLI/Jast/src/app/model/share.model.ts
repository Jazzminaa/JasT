import { Quiz } from "./quiz.model";
import { User } from "./user.model";

export class Share{
    id: number;
    quiz:Quiz;
    user1:User;
    user2:User;

    test(): any {
        if(this.id == undefined)
        {
            this.id = 0;
        }
    }

    getJson()
    {
        this.test();
        return "{"+
        "\"id\":"+ this.id+","+
        "\"quiz\":"+this.quiz.getJson()+" ,"+
        "\"user1\":"+ this.user1.getJson()+","+
        "\"user2\":" +this.user2.getJson()+
    +"}";
    }
}