import { User } from './user.model';
import { QuizType } from './quiztype.model';
import { Quiz } from './quiz.model';
import { Category } from './category.model';
export class Score{

    id: number;
    points: number;
    user: User;
    quiz:Quiz;
    playDay: Date;
    
   
}