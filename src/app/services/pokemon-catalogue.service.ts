import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';


const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
  
  private _pokemons : BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([]);
  private _error : string = "";
  private _loading : boolean = false;
  private _sprites : string = "";

  public get pokemons() : Observable<Pokemon[]> {
    return this._pokemons.asObservable();
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemon(): void{

    if (this._pokemons.value.length > 0 || this.loading) {
     return;
    }

    this._loading = true; 
    this.http.get<PokemonResponse>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false;
      }),
      map((pokemonResponse : PokemonResponse) => {
        console.log("map response", pokemonResponse.results)
        console.log("reuslts response " , pokemonResponse.results)
        console.log(pokemonResponse.results)
        console.log("url")
        return pokemonResponse.results
      })
    )
    .subscribe({
      next: (pokemons: Pokemon[]) => {
        console.log("pokemons response", pokemons)
        this._pokemons.next(pokemons) 
        for(let i = 0; i < pokemons.length; i++) {
          let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`
          pokemons[i].sprites = sprite;
        }
        
      },
      error : (error : HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemons.value.find((pokemon: Pokemon) => pokemon.name === name)
   }

}
   

interface PokemonResponse {
  results : Pokemon[]
  
}
