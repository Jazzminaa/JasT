export class User{
    id: number;
    dateOfBirth: Date;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    gender: string;
    password: string;
    picture: string;
    multiplay:number;
    

    test(): any {
        if(this.id == undefined)
        {
            this.id = 0;
        }

        if(this.multiplay == undefined)
        {
            this.multiplay = null;
        }
    }
    
    getJson()
    {
        this.test();
        return "{"+
            "\"id\": "+this.id+","+
            "\"dateOfBirth\": \""+this.dateOfBirth+"\","+
            "\"email\": \""+this.email+"\","+
            "\"firstname\": \""+this.firstname+"\","+
            "\"gender\": \""+this.gender+"\","+
            "\"password\": \""+this.password+"\","+
            "\"picture\": null,"+
            "\"lastname\": \""+this.lastname+"\","+
            "\"username\": \""+this.username+"\","+
            "\"multiplay\": "+this.multiplay+
        "}";
    }
}

