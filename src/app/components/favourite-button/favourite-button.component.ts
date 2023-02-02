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

  public loading: boolean = false;
  public isFavourite: boolean = false;
  @Input() pokemonName: string = "";

  

  constructor(
    private userService : UserService,
    private readonly favouriteService : FavouriteService
  ) { }

  ngOnInit(): void {
    // inputs resolved
    this.isFavourite = this.userService.inFavourites(this.pokemonName);
  }
  onFavouriteClick() : void{
    this.loading = true;
    // Add pokemon to favourites
    this.favouriteService.addToFavourites(this.pokemonName)
    .subscribe({
      next: (user : User) => {
        this.loading = false;
        this.isFavourite = this.userService.inFavourites(this.pokemonName)
      },
      error: (error : HttpErrorResponse) => {
        console.log("Error", error.message)
      }
    })
  }
}
