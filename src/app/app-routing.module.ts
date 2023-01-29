import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./pages/login/login.page";
import { PokemonCataloguePage } from "./pages/pokemon-catalogue/pokemon-catalogue.page";
import { ProfilePage } from "./pages/profile/profile.page";


// Define routes for the application
const routes: Routes = [
        // This is used to reroute the user to the login page
        // if an empty page was typed in the browser search
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },
    {
        path: "login",
        component: LoginPage
    },
    {
        path: "pokemon",
        component: PokemonCataloguePage
    },
    {
        path: "profile",
        component: ProfilePage
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], // Always used to import module
    exports: [
        RouterModule
    ] // Always used to expose module and its features
})

export class AppRoutingModule {

}