import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  get user(): User | undefined {
    return this.userService.user;
  }

  get pokemon(): Pokemon[]{
    if(this.userService.user) {
      return this.userService.user.pokemon
    }
    return [];
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }


}
