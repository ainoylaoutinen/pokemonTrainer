import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit{

  @Input() pokemonName: string = "";

  get loading(): boolean {
    return this.favouriteService.loading;
  }

  constructor(
    private readonly favouriteService: FavouriteService
  ){}

  ngOnInit(): void {
    
  }
  onFavouriteClick() : void{
    // Add pokemon to favourites
    alert("Pokemon clicked " + this.pokemonName )
    this.favouriteService.addToFavourites(this.pokemonName)
    .subscribe({
      next: (response: any) => {
        console.log("next", response)
      },
      error: (error: HttpErrorResponse) => {
        console.log("error", error.message)
      }
    })
  }
}
