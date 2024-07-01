import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import {ApiService} from "../../services/api.service";
import {POST_USER_NAME_URL} from "../constant/url.constant";

export function usernameValidator(http: ApiService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    const username = control.value;

    if (!username) {
      return of(null);
    }

    return of(username).pipe(
      debounceTime(300),
      switchMap(value => {
        return http.post<any>(POST_USER_NAME_URL, { username: value }).pipe(
          map(response => {
            return response.isAvailable ? null : { usernameTaken: true };
          }),
          catchError(() => of({ usernameTaken: true }))
        );
      })
    );
  };
}
