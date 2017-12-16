import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';

export class Content{
    id: number;
    input1: string;
    input2: string;
    picture1: string;
    picture2: string;
    timestamp: Date;
    quiz: Quiz;
    quizType: QuizType;
    user:User;

    getJson()
    {
        return "{"+
            "\"id\": 0,"+
            "\"input1\": "+this.input1+","+
            "\"input2\": "+this.input2+"," +
             "\"picture1\": "+null+"," +
            "\"picture2\": "+null+"," +
            "\"timestamp\": "+12121212+"," +
            "\"id\": 0,"+
            "\"age\": "+0+","+
            "\"creationDate\": 1489490100000,"+
            "\"description\": \""+null+"\","+
            "\"multiplay\": 0,"+
            "\"name\": \""+null+"\","+
            "\"picture\": null,"+
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