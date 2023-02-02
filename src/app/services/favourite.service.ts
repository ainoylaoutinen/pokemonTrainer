import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable , tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const {apiKey, apiUsers} = environment

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

 
  constructor(
    private http: HttpClient,
    private readonly pokemonService : PokemonCatalogueService,
    private readonly userService : UserService,
  ) { }
  // get pokemon based on Name 
  

  // Patch request with the userId and the pokemon
  public addToFavourites(pokemonName: string): Observable<User> {
    if(!this.userService.user) {
      throw new Error("addToFavourites: There is no user ");
    } 

    const user: User = this.userService.user;

    const pokemon : Pokemon | undefined = this.pokemonService.PokemonByName(pokemonName);

    if (!pokemon) {
      throw new Error ("addToFavourites No pokemon with name: " + pokemonName)
    }

    if(this.userService.inFavourites(pokemonName)) {
      this.userService.removeFromFavourites(pokemonName)
    } else {
      this.userService.addToFavourites(pokemon)
    }

    const headers = new HttpHeaders({
      'Content-Type' : 'Application/json',
      'x-api-key' :  apiKey 
    })

    

    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      pokemon: [...user.pokemon]
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
