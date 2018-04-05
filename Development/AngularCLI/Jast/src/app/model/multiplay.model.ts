import { Quiz } from "./quiz.model";
import { User } from "./user.model";


export class Multiplay{
    id: number;
    name: string;
    quiz: Quiz;
    user: User;
}