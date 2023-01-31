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
    this._loading = true; 
    this.http.get<PokemonResponse>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false;
      }),
      map((pokemonResponse : PokemonResponse) => {
        console.log("map response", pokemonResponse)
        return pokemonResponse.results
      
      
      })
    
    )
    .subscribe({
      next: (pokemons: Pokemon[]) => {
        console.log("pokemons response", pokemons)
        this._pokemons.next(pokemons)
      },
      error : (error : HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }}
   

interface PokemonResponse {
  results : Pokemon[]
}
