import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map} from 'rxjs/operators'

//const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  //private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  //get pokemons(): Pokemon[] {
   // return this._pokemons;
    
  //}

 get error(): string {
  return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private readonly http: HttpClient) { }

  private readonly _pokemons$: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>([])

    public findAllPokemons(): void {
      this._loading = true;
      this.http.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon/")
      .pipe(
        map((pokemonResponse: PokemonResponse)=> {
          return pokemonResponse.pokemons
        })
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          console.log(pokemons)
          this._pokemons$.next(pokemons)
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
          console.log(error.message)

        }
      })

    }
  

  //public addPokemon(pokemon: Pokemon): void {
    //this._pokemons$.next([...this._pokemons$.value, pokemon])
  //}

  public get pokemons$(): Observable<Pokemon[]> {
    return this._pokemons$.asObservable()
  }
}


  interface PokemonResponse {
    pokemons: Pokemon[]
  }

