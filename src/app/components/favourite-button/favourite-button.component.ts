import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit{

  @Input() pokemonName: string = "";

  constructor() { }

  ngOnInit(): void {
    
  }
  onFavouriteClick() : void{
    // Add pokemon to favourites
    alert("Pokemon clicked " + this.pokemonName )
  }
}
