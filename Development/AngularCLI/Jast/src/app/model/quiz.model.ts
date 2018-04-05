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
}