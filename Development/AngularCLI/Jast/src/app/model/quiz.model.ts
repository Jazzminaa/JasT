import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Category } from './category.model';

export class Quiz{
    id: number;
    age: number;
    creationDate: number;
    description: string;
    multiplay: number;
    name: string;
    category: Category;
    quizType: QuizType;
    user: User;
    picture: string;

    getJson()
    {
        return "{"+
            "\"id\": "+this.id+","+
            "\"age\": "+this.age+","+
            "\"creationDate\": 1489490100000,"+
            "\"description\": \""+this.description+"\","+
            "\"multiplay\": 0,"+
            "\"name\": \""+this.name+"\","+
            "\"picture\": null,"+
            "\"category\": "+this.category.getJson()+","+
            "\"quiztype\": "+this.quizType.getJson()+","+
           "\"user\": "+this.user.getJson()+
        "}";
    }
}