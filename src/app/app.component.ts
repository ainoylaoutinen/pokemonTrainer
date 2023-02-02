import { Component, OnInit} from '@angular/core';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { UserService } from './services/user.service';
import {  PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokemontrainerapp';
  constructor(
    private readonly userService: UserService,
    private readonly pokemonCatalogueService: PokemonCatalogueService
  ) {}

  ngOnInit(): void {
    if (this.userService.user) {
      this.pokemonCatalogueService.findAllPokemon();
    }
  }
}
