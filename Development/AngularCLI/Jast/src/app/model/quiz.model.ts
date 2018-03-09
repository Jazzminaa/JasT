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
        this.test();
        return "{"+
            "\"id\": "+this.id+","+
            "\"age\": "+this.age+","+
            "\"creationDate\": 1489490100000,"+
            "\"description\": \""+this.description+"\","+
            "\"multiplay\": "+this.multiplay+","+
            "\"name\": \""+this.name+"\","+
            "\"picture\": null,"+
            "\"category\": {"+
                "\"id\": "+this.category.id+","+
                "\"name\": \""+this.category.name+"\""+
            "},"+
            "\"quiztype\": {"+
                "\"id\": "+this.quizType.id+","+
               " \"name\": \""+this.quizType.name+"\""+
            "},"+
            "\"user\": {"+
                "\"id\": "+this.user.id+","+
                "\"dateOfBirth\": \""+this.user.dateOfBirth+"\","+
                "\"email\": \""+this.user.email+"\","+
                "\"firstname\": \""+this.user.firstName+"\","+
                "\"gender\": \""+this.user.gender+"\","+
                "\"password\": \""+this.user.password+"\","+
                "\"picture\": null,"+
                "\"lastname\": \""+this.user.lastName+"\","+
                "\"username\": \""+this.user.username+"\","+
                "\"multiplay\": null"+
            "}"+
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
    }
}