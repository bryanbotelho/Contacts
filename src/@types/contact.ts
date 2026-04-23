export interface CreateCountry {
    id: number;
    name: string;
    iso: string;
    phoneCode: string; 
    contacts: CreateContact[];
}

export interface CreateContact {
    id: number;
    firstName: string;
    lastName: string;
    number: string;
    countryId: number;
    country?: CreateCountry;
    createdAt: Date;
    updateAt: Date;
}

export interface UpdateContact {
    id?: number;
    firstName?: string;
    lastName?: string;
    number?: string;
    countryId?: number;
    country?: CreateCountry;
    createdAt?: Date;
    updateAt: Date;
}