import { LoginSignupComponent } from './login-signup/login-signup.component';
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OldmodelsComponent } from './oldmodels/oldmodels.component';
import { SalesGraphComponent } from './sales-graph/sales-graph.component';
import { LanguageModalComponent } from './language-modal/language-modal.component';
import { CardDetailsComponent } from './card-details/card-details.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'maincontent', component: MainComponent},
    { path: 'oldmodels', component:OldmodelsComponent},
    { path: 'login-signup', component:LoginSignupComponent},
    { path: 'sales-graph', component:SalesGraphComponent},
    { path: 'language-modal', component:LanguageModalComponent},
    { path: 'cards/:id', component:CardDetailsComponent},
];
