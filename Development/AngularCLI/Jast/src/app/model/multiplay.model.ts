import { Quiz } from "./quiz.model";
import { User } from "./user.model";


export class Multiplay{
    id: number;
    name: string;
    quiz: Quiz;
    user: User;


    getJson()
    {
        this.test();
        return     "{"+
            "\"id\": "+this.id+","+
            "\"name\": \""+this.name+"\","+
            "\"quiz\": "+this.quiz.getJson()+ ","+
            "\"ownwer\": "+this.user.getJson()+
        "}";
    }

    test()
    {
         if(this.quiz.multiplay == undefined || this.quiz.multiplay == null)
        {
            this.quiz.multiplay = 0;
        }
        if(this.id == undefined || this.id == null)
        {
            this.id = 0;
        }
    }
}