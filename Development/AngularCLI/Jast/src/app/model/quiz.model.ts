import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Category } from './category.model';

export class Quiz{
    id: number;
    age: number;
    creationDate: Date;
    description: string;
    multiplay: number;
    name: string;
    category: Category;
    quiztype: QuizType;
    user: User;
    picture: string;
    maxScore: number;
    priority:number;

    getJson()
    {
        this.test();
        return "{"+
            "\"id\": "+this.id+","+
            "\"age\": "+this.age+","+
            "\"creationDate\": \""+this.creationDate+","+
            "\"description\": \""+this.description+"\","+
            "\"multiplay\": "+this.multiplay+","+
            "\"name\": \""+this.name+"\","+
            "\"picture\": null,"+
            "\"category\": "+this.category.getJson()+","+
            "\"quiztype\": "+this.quiztype.getJson()+","+
            "\"user\": "+this.user.getJson()+","+
            "\"maxScore\": "+this.maxScore+","+
            "\"priority\": "+this.priority+
        "}";
    }

    test()
    {
         if(this.multiplay == undefined || this.multiplay == null)
        {
            this.multiplay = 0;
        }
        if(this.id == undefined || this.id == null)
        {
            this.id = 0;
        }
        if(this.creationDate == undefined || null)
        {
            this.creationDate = new Date("2017-03-14");
        }
    }
}