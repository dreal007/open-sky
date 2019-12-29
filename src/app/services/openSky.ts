import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage';
import { HttpService } from '../services/http';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    airPortMocks = [
        {
            name: "Hartsfield–Jackson International Airport",
            location: "Atlanta, Georgia",
            country: "United States",
            icaoCode: "KATL"
        },
        {
            name: "Los Angeles International Airport",
            location: "Los Angeles, California",
            country: "United States",
            icaoCode: "KLAX"
        },

        {
            name: "Tokyo Haneda Airport",
            location: "Ōta, Tokyo",
            country: "Japan",
            icaoCode: "RJTT"
        },

        {
            name: "Dubai International Airport",
            location: "Garhoud, Dubai",
            country: "United Arab Emirates",
            icaoCode: "OMDB"
        },

        {
            name: "O'Hare International Airport",
            location: "Chicago, Illinois",
            country: "United States",
            icaoCode: "KORD"
        },

        {
            name: "London Heathrow Airport",
            location: "Hillingdon, London",
            country: "United Kingdom",
            icaoCode: "EGLL"
        },

        {
            name: "Hong Kong International Airport",
            location: "Chek Lap Kok, Islands, New Territories",
            country: "Hong Kong SAR, China",
            icaoCode: "VHHH"
        },

        {
            name: "Paris-Charles de Gaulle Airport",
            location: "Roissy-en-France, Île-de-France",
            country: "France",
            icaoCode: "LFPG"
        },

        {
            name: "Dallas/Fort Worth International Airport",
            location: "Dallas-Fort Worth, Texas",
            country: "United States",
            icaoCode: "KDFW"
        },

        {
            name: "Amsterdam Airport Schiphol",
            location: "Haarlemmermeer, North Holland",
            country: "The Netherlands",
            icaoCode: "EHAM"
        }

    ] 

    public store : any;
    public showArrivals : boolean = false;
    public showDepartures: boolean = false;
    
    constructor(
        private storage: StorageService,
        private $http: HttpService
    ) { }

    getArrivalByAirports(params){
        let queryParams = this.formatQueryString(params);
        return this.$http.get('/flights/arrival?'+queryParams)
    }

    getDepartureByAirports(params) {
        let queryParams = this.formatQueryString(params);
        return this.$http.get('/flights/departure?' + queryParams)
    }

    getAirport(){
        return this.airPortMocks
    }

    formatQueryString(query) {
        let queryString = '';
        Object.keys(query).forEach(key => {
            queryString = queryString + `&${key}=${query[key]}`
        });
        queryString = queryString.substr(1, queryString.length);
        return queryString
    }

} 