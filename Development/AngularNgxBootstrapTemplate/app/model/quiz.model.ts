import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Category } from './category.model';

export class Quiz{
    id: number;
    age: number;
    creationDate: Date;
    description: string;
    expirationDate: Date;
    multiplay: number;
    name: string;
    category: Category;
    quizType: QuizType;
    user: User;

    getJson()
    {
        return "{"+
            "\"id\": 0,"+
            "\"age\": "+this.age+","+
            "\"creationDate\": 1489490100000,"+
            "\"description\": \""+this.description+"\","+
            "\"multiplay\": 0,"+
            "\"name\": \""+this.name+"\","+
            "\"picture\": null,"+
            "\"category\": {"+
             "   \"id\": "+this.category.id+","+
              "  \"name\": \""+this.category.name+"\""+
            "},"+
            "\"quiztype\": {"+
             "   \"id\": "+this.quizType.id+","+
              "  \"name\": \""+this.quizType.name+"\""+
           " },"+
            "\"user\": {"+
             "   \"id\": "+this.user.id+","+
              "  \"dateOfBirth\": 1489490100000,"+
               " \"email\": \""+this.user.email+"\","+
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
}