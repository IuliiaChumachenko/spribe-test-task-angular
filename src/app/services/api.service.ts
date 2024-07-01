import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    const httpParams = params || new HttpParams();

    return this.http.get<T>(url, {params: httpParams})
      .pipe(
        catchError(this.handleError<T>(`get${url}`, [] as T)),
      );
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body)
      .pipe(
        catchError(this.handleError<T>(`get${url}`, [] as T)),
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
