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
             "   \"id\": 1,"+
              "  \"dateOfBirth\": 1489490100000,"+
               " \"email\": \"m@test.com\","+
                "\"firstname\": \"muster\","+
                "\"gender\": \"m\","+
                "\"password\": \"1234\","+
                "\"picture\": null,"+
                "\"lastname\": \"mustermann\","+
                "\"username\": \"Musti\","+
                "\"multiplay\": null"+
            "}"+
        "}";
    }
}