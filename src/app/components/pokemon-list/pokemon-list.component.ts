import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model'
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService) {    
  }
  ngOnInit(): void {
    this.pokemonCatalogueService.findAllPokemons()
  }

  public get pokemons$(): Observable<Pokemon[]> {
    return this.pokemonCatalogueService.pokemons$
  }
}