export interface ResultCountry {
    id: number;
    name: string;
    iso: string;
    phoneCode: string; 
    contacts: ResultContact[];
}

export interface ResultContact {
    id: number;
    firstName: string;
    lastName: string;
    number: string;
    countryId: number;
    country?: ResultCountry;
    createdAt: Date;
    updateAt: Date;
}