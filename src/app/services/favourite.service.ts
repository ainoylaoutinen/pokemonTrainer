import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const { apiKey, apiUsers } = environment;

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService,
  ) { }

  public addToFavourites(pokemonName: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error("addToFavorites: there is no user")
    }

    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(pokemonName);

    if (!pokemon) {
      throw new Error("no pokemon with id: " + pokemonName)
    }

    if (this.userService.inFavorites(pokemonName)) {
      throw new Error("pokemon already in favorotes");
    }
    
    const headers = new HttpHeaders({
      'Content-Type' : 'Application/json',
      'x-apikey' : apiKey
    })

    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon, pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser;
      })
    )
  }
}

