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
}