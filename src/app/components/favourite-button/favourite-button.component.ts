import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit{

  @Input() pokemonName: string = "";

  get loading() : boolean{
    return this.favouriteService.loading
  }

  constructor(
    private readonly favouriteService : FavouriteService
  ) { }

  ngOnInit(): void {
    
  }
  onFavouriteClick() : void{
    // Add pokemon to favourites
    this.favouriteService.addToFavourites(this.pokemonName)
    .subscribe({
      next: (response : any) => {
        console.log("Next ", response)
      },
      error: (error : HttpErrorResponse) => {
        console.log("Error", error.message)
      }
    })
  }
}
