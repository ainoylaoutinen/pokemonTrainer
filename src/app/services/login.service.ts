import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { apiUsers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Dependancy injection HTTP client into login service
  // Tells what type of serviec it is injecting into the file
  constructor(private readonly http: HttpClient) { }

  // Models, Observables, and RxJS operators
  public login(username: string): Observable<User>{
    return this.checkUsername(username)
    .pipe(
      switchMap((user: User | undefined) => {
        if(user === undefined) {
          // user does not exist
          return this.createUser(username);
        }
        return of(user);
      }),
      tap((user: User) => {
        StorageUtil.storageSave<User>(StorageKeys.User, user);
      })
    )
  }
  // Login 

  // Check if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(
        //.Pipe function can use rxjs operators
        map(( response: User[]) => response.pop())
      )
  }  

  // IF NOT user exists - Create a user
  private createUser(username: string): Observable<User>{
    // create user
    const user = {
      username, 
      pokemon: []
    };
    // headers -> API key
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key" : apiKey
    });
    // Post request to create an item on the server

    return this.http.post<User>(apiUsers, user, {
      headers
    })
  }
  // IF User || Created User exists - Store a user
}
