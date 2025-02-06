import { LoginSignupComponent } from './login-signup/login-signup.component';
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OldmodelsComponent } from './oldmodels/oldmodels.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'maincontent', component: MainComponent},
    { path: 'oldmodels', component:OldmodelsComponent},
    { path: 'login-signup', component:LoginSignupComponent}
];
