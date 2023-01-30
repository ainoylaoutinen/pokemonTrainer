<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

=======
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageUtil } from '../utils/storage.util';
import { StorageKeys } from '../enums/storage-keys.enum';
>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772

const { apiUsers, apiKey } = environment;

@Injectable({
<<<<<<< HEAD
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
=======
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      }),
      tap((user: User) => {
        StorageUtil.storageSave<User>(StorageKeys.User, user);
      })
    );
  }

  //chevk if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http
      .get<User[]>(`${apiUsers}?username=${username}`)
      .pipe(map((response: User[]) => response.pop()));
  }

  private createUser(username: string): Observable<User> {
    const user = {
      username,
      pokemons: [],
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http.post<User>(apiUsers, user, {
      headers,
    });
  }
>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772
}
