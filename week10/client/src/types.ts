type Person = {
    id:string,
    name:string,
    age:number,
    url:string,
    addresses:Address[];
};

type Address = {
    id:string,
    street:string,
    zip:number,
    people:Person[];
};

type Theme = {
    isLight: boolean;
    light: {
        color:string;
        bg:string;
    }
    dark: {
        color:string;
        bg:string;
    }
}

export type {Person, Address,Theme};