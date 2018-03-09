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
        return {
            "id": 1,
            "points": "200",
            "timestamp": 1520431560813,
            "quiz": {
                "id": 1,
                "age": 8,
                "creationDate": "2017-03-14",
                "description": "Berrechne die Multiplikationen.",
                "multiplay": 0,
                "name": "Der Rechenkönig",
                "picture": null,
                "timestamp": 1520431449974,
                "category": {
                    "id": 1,
                    "name": "Mathematik",
                    "timestamp": 1520431449521
                },
                "quiztype": {
                    "id": 1,
                    "name": "QandA",
                    "timestamp": 1520431449833
                },
                "user": {
                    "id": 1,
                    "dateOfBirth": "2012-02-20",
                    "email": "m@test.com",
                    "firstname": "muster",
                    "gender": "m",
                    "lastname": "mustermann",
                    "password": "1234",
                    "picture": null,
                    "timestamp": 1520431449927,
                    "username": "Musti",
                    "multiplay": null
                }
            },
            "user": {
                "id": 1,
                "dateOfBirth": "2012-02-20",
                "email": "m@test.com",
                "firstname": "muster",
                "gender": "m",
                "lastname": "mustermann",
                "password": "1234",
                "picture": null,
                "timestamp": 1520431449927,
                "username": "Musti",
                "multiplay": null
            }
        };
    }
}