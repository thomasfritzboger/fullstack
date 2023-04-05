export interface CreatePersonInput {
    name: string;
    age: number;
    addressId?: [string]; // Optional addressId
}

export interface CreateAddressInput {
    street: string;
    city: string;
    personId?: [string]; // Optional personId
}

export interface RelationArgs {
    personId: string;
    addressId: string;
}

export interface DeletePersonInput {
    id: string;
}