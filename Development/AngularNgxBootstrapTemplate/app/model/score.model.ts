import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';
import { Category } from './category.model';
export class Score{
    id: number;
    points: number;
    category: Category;
    quizType: QuizType;
    user: User;

     getJson()
    {
        return "{"+
            "\"id\": 0,"+
            "\"points\": "+this.points+","+
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