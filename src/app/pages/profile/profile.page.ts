import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {


  @Output() logout : EventEmitter<void> = new EventEmitter();

  get user() : User | undefined {
    return this.userService.user;
  }


  get favourites(): Pokemon[] {
    if(this.userService.user) {
      console.log("Favourites", this.favourites)
      return this.userService.user.pokemon;
      
    }
    return [];
  }

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    
  }
}
