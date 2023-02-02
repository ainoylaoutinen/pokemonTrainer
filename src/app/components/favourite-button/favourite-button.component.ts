import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit{

  public isFavourite: boolean = false;
  @Input() pokemonName: string = "";

  get loading() : boolean{
    return this.favouriteService.loading
  }

  constructor(
    private userService : UserService,
    private readonly favouriteService : FavouriteService
  ) { }

  ngOnInit(): void {
    // inputs resolved
    this.isFavourite = this.userService.inFavourites(this.pokemonName);
  }
  onFavouriteClick() : void{
    // Add pokemon to favourites
    this.favouriteService.addToFavourites(this.pokemonName)
    .subscribe({
      next: (user : User) => {
        this.isFavourite = this.userService.inFavourites(this.pokemonName)
      },
      error: (error : HttpErrorResponse) => {
        console.log("Error", error.message)
      }
    })
  }
}
