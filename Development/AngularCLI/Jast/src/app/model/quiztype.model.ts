export class QuizType{
    id: number;
    name: string;

    getJson()
    {
        if(this.id == undefined)
        {
            this.id = 0;
        }
        return "{"+
            "\"id\": "+this.id+","+
            "\"name\": \""+this.name+"\""+
        "}";
    }
}