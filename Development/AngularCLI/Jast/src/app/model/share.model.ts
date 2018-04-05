import { Quiz } from "./quiz.model";
import { User } from "./user.model";

export class Share{
    id: number;
    quiz:Quiz;
    user1:User;
    user2:User;
}