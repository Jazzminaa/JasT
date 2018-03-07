export class QuizType{
    id: number;
    name: string;

    getJson()
    {
        return     "{\"id\": "+this.id+","+
                    "\"name\": \""+this.name+"\"}";
    }
}