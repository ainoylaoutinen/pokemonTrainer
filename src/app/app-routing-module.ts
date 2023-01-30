import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./pages/catalogue/catalogue.page";
import { LoginPage } from "./pages/login/login.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [
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
        path: "trainer",
        component: TrainerPage

    },
    {
        path: "catalogue",
        component: CataloguePage
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], //import a module
    exports: [
        RouterModule
    ] //to export updated version back
})

export class AppRoutingModule{

}