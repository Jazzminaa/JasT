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
    category: string;
    quizType: QuizType;
    user: User;
}