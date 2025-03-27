import { LoginSignupComponent } from './login-signup/login-signup.component';
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OldmodelsComponent } from './oldmodels/oldmodels.component';
import { SalesGraphComponent } from './sales-graph/sales-graph.component';
import { LanguageModalComponent } from './language-modal/language-modal.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { ConfiguratorMainComponent } from './configurator/configurator-main/configurator-main.component';
import { ConfiguratorColorComponent } from './configurator/configurator-color/configurator-color.component';
import { ConfiguratorExtraComponent } from './configurator/configurator-extra/configurator-extra.component';
import { ConfiguratorPreCompiledComponent } from './configurator/configurator-pre-compiled/configurator-pre-compiled.component';
import { ConfiguratorDriveToComponent } from './configurator/configurator-drive-to/configurator-drive-to.component';
import { ConfiguratorEquipmentComponent } from './configurator/configurator-equipment/configurator-equipment.component';
import { ConfiguratorReadyToBuyComponent } from './configurator/configurator-ready-to-buy/configurator-ready-to-buy.component';
import { ConfiguratorFooterComponent } from './configurator/configurator-footer/configurator-footer.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'maincontent', component: MainComponent},
    { path: 'oldmodels', component:OldmodelsComponent},
    { path: 'login-signup', component:LoginSignupComponent},
    { path: 'sales-graph', component:SalesGraphComponent},
    { path: 'language-modal', component:LanguageModalComponent},
    { path: 'cards/:id', component:CardDetailsComponent},
    { path: 'configuratorMain', component:ConfiguratorMainComponent},
    { path: 'configColor', component:ConfiguratorColorComponent},
    { path: 'configExtra', component:ConfiguratorExtraComponent},
    { path: 'configPreComp', component:ConfiguratorPreCompiledComponent},
    { path: 'configDriveTo', component:ConfiguratorDriveToComponent},
    { path: 'configEquipment', component:ConfiguratorEquipmentComponent},
    { path: 'configReady', component:ConfiguratorReadyToBuyComponent},
    { path: 'configFooter', component:ConfiguratorFooterComponent},
    { path: 'profile', component:ProfileComponent}
];
