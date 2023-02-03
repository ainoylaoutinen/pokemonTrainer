import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  
  @Input() isProfilePage : boolean = false;

  constructor(
    private readonly pokemonCatalogueService : PokemonCatalogueService,
    private readonly userService : UserService,
    ) { }

  ngOnInit() : void {
    this.pokemonCatalogueService.findAllPokemon()
    this.pokemonCatalogueService.pokemons
    .subscribe({
      next: (pokemon: Pokemon[]) => {
        this.allPokemon = pokemon
      }
    })
  }

  allPokemon: Pokemon[] = [];

  // Represents the values of the Pokemon model
  public get pokemons() : Pokemon[] {
    return (this.isProfilePage) ? this.userService.user?.pokemon || [] : this.allPokemon
  }
}
