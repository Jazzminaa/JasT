import { Quiz } from "./quiz.model";
import { User } from "./user.model";

export class Description{
    id: number;
    reason: string;
    quiz:Quiz;
    user1:User;
    user2:User;
    description: string

}