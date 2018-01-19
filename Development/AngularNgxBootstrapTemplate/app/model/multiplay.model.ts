import { Quiz } from "./quiz.model";
import { User } from "./user.model";


export class Multiplay{
    id: number;
    name: string;
    counter: number;
    quiz: Quiz;
    user: User;


    getJson()
    {
        return     "\"id\": "+this.id+","+
                    "\"name\": \""+this.name+"\"";
    }
}