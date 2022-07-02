export enum Type {
    FLAT,HOUSE,CAR
}

export interface Result {
    price: any;
}

export interface Car {
    latitude: any;
    longitude: any;
    brand: any;
    model: any;
    year: any;
    fuel: any;
    km: any;
    shifter: any;
    body: any;
    color: any;
    registration: any;
    registered_until: any;
    emission_class: any;
    kw: any;
    hp: any;
}

export interface House {
    latitude: any;
    longitude: any;
    number_of_rooms: any;
    square_foot: any;
    number_of_floors: any;
    heating: any;
    yard_area: any;
    type_of_house: any;
    state: any;
    equipment: any;
    number_of_balconies: any;
    number_of_bathrooms: any;
    basement: any;
    number_of_parkings_garage: any;
    orientation: any;
}

export interface Flat {
    latitude: any;
    longitude: any;
    number_of_rooms: any;
    square_foot: any;
    heating: any;
    floor: any;
    type_of_flat: any;
    state: any;
    equipment: any;
    elevator: any;
    number_of_balconies: any;
    number_of_bathrooms: any;
    basement: any;
    number_of_parkings_garage: any;
    orientation: any;
}