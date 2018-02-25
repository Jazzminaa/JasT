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
            "\"category\": "+this.category.getJson+","+
            "\"quiztype\": "+this.quizType.getJson+","+
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