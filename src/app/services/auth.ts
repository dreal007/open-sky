import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private storage: StorageService
    ){}

    isAuthenticated(){
        if(this.storage.getLocal('authToken') !== null){
            return true;
        }
        else return false;
    }

}    