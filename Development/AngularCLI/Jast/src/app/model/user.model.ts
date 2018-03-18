export class User{
    id: number;
    dateOfBirth: Date;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    password: string;
    picture: string;
    multiplay:string;
    

    getJson()
    {
        return "{"+
            "\"id\": "+this.id+","+
            "\"dateOfBirth\": \""+this.dateOfBirth+"\","+
            "\"email\": \""+this.email+"\","+
            "\"firstname\": \""+this.firstName+"\","+
            "\"gender\": \""+this.gender+"\","+
            "\"password\": \""+this.password+"\","+
            "\"picture\": null,"+
            "\"lastname\": \""+this.lastName+"\","+
            "\"username\": \""+this.username+"\","+
            "\"multiplay\": null"+
        "}";
    }
}