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

    getJson()
    {
        return "{"+
            "\"id\": 0,"+
            "\"dateOfBirth\": "+"1489490100000"+","+
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