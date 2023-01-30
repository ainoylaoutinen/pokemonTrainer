<<<<<<< HEAD
import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
=======
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

<<<<<<< HEAD
  @Output() login : EventEmitter<void> = new EventEmitter();


  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    ) { }

  public loginSubmit(loginForm: NgForm): void {
    
    
    // username
    const {username} = loginForm.value;
    
    
    this.loginService.login(username)
    .subscribe({
      next:  (user: User) => {
        // Do we need the user
        this.userService.user = user;
        this.login.emit();
      },
      error: () => {
        // handle locally
      }
    })
  }
=======
  constructor(private readonly loginService: LoginService) {}

  public loginSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;


    this.loginService.login(username)
    .subscribe({
      next: (user: User) => {

      },
      error: () => {

      }
    })
  }

>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772
}
