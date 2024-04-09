




export class LocationGeo {
    lat : string ;
    lng : string ;
    [key: number] : number; 
}

export class Adress {
    street : string ;
    suite : string ;
    city : string ;
    zipcode : string ;
    geo : LocationGeo;
    [key: number] : number; 
}

export class Company {
    name: string;
    catchPhrase: string;
    bs: string;
    [key: number] : number; 
}


export class User {
    id: number ;
    name: string;
    username : string;
    email: string;
    address : Adress ;
    phone : string;
    website : string;
    company :  Company;
    [key: number] : number; 
}
export class Album {
    id : number ;
    title: String;
    user : User ;
    [key: number] : number; 
}



export class Photo{
    id : number ;
    url : string ;
    thumbnailUrl : string;
    title : string ;
    album : Album  ;
}


export class Photos{
    [key:string] : Photo;
}


