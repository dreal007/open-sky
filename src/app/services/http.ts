import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, of } from 'rxjs';
import { map, mapTo, tap, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions : {}
  httpParams = new HttpParams()
  httpHeaders = new HttpHeaders();
  baseUrl = "https://opensky-network.org/api";

  constructor(
    private http : HttpClient, 
    public injector : Injector,
    public router : Router
    ){}

  setParam(key: string, value: any){
    return this.httpParams.set(key, value)
  }

  setHeader(header : string, value: string){
    return this.httpHeaders.set(header, value)
  }

   handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', error.error.message);
      } else if(error instanceof HttpErrorResponse){
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        switch ((<HttpErrorResponse>error).status) {
          case 403:
            return this.handleAll(error.error.responseText, error.error, error.status);
          case 504:
            return this.handleAll(error.error.responseText, error.error);
          case 401:
            return this.handleAll(error.error.responseText, error.error);
          case 400:
            return this.handleAll(error.error.responseText, error.error);
          case 500:
            return this.handleAll(error.error.responseText, error.error);     
        }
          let errorMessage = `Server returned code ${error.status}, ` + `body was: ${error.error}`;
          console.log(errorMessage);
      }
      // return an observable with a user-facing error message
      let errorMessage = 'Something bad happened; please try again later.'
      return throwError(errorMessage);
  };

  handleAll(message ? : string , error ?, status? ){
    console.log(error)
  }


  get(url):Observable<any>{
      return this.http.get<any>(this.baseUrl + url)
  }
}
