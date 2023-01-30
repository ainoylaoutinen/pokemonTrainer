import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginPage } from './pages/login/login.page';
=======
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { CataloguePage } from './pages/catalogue/catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';

// Decorators 
@NgModule({
  //Componets go in declerations
  declarations: [
    AppComponent,
<<<<<<< HEAD
    PokemonCataloguePage,
    ProfilePage,
    LoginPage,
=======
    LoginPage,
    CataloguePage,
    TrainerPage,
>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772
    LoginFormComponent
  ],
  // Modules go in imports 
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule, 
=======
    FormsModule
>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
