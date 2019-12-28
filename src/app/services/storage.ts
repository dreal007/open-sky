import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage, SessionStorageService, SessionStorage } from 'ngx-webstorage';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private localStoreService: LocalStorageService,
        private sessionStoreService: SessionStorageService,
        private cookieStoreService: CookieService

    ) { }

    setLocal(key: string, value: any): void {
        return this.localStoreService.store(key, value);
    }

    getLocal(key: string): any {
        return this.localStoreService.retrieve(key);
    }

    clearLocal(key?: string): void {
        return key ? this.localStoreService.clear(key) : this.localStoreService.clear()
    }

    observeLocal(key?: string): Observable<any> {
        let result: any;
        this.localStoreService.observe(key)
            .subscribe((newValue) => {
                result = newValue
            })
        return result
    }

    setSession(key: string, value: any): void {
        return this.sessionStoreService.store(key, value);
    }

    getSession(key: string): any {
        return this.sessionStoreService.retrieve(key);
    }

    clearSession(key?: string): void {
        return key ? this.sessionStoreService.clear(key) : this.sessionStoreService.clear()
    }

    observeSession(key?: string): Observable<any> {
        let result: any;
        this.sessionStoreService.observe(key)
            .subscribe((newValue) => {
                result = newValue
            })
        return result
    }


    setCookie(key: string, value: string, domain: string = '/', expires: number = 0.08): void {
        return this.cookieStoreService.set(key, value, expires, domain);
    }

    checkCookie(key: string): boolean {
        return this.cookieStoreService.check(key);
    }

    getCookie(key: string): any {
        return key ? this.cookieStoreService.get(key) : this.cookieStoreService.getAll();
    }

    clearCookie(key?: string): void {
        return key ? this.cookieStoreService.delete(key) : this.cookieStoreService.deleteAll()
    }

    clearAll() {
        this.cookieStoreService.deleteAll()
        this.sessionStoreService.clear()
        this.localStoreService.clear()

    }

    // isSessionAvailable():boolean{
    //   return this.sessionStoreService.isStorageAvailable()
    // }

    // isLocalAvailable():boolean{
    //   return this.localStoreService.isStorageAvailable()
    // }
}
