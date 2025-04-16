import { Routes } from '@angular/router';
import { AuthRouterComponent } from './components/routes/auth-router/auth-router.component';
import { LoginComponent } from './components/site/login/login.component';
import { TotpComponent } from './components/site/totp/totp.component';
import { MainRouterComponent } from './components/routes/main-router/main-router.component';
import { HomeComponent } from './components/site/home/home.component';
import { LogoutComponent } from './components/site/logout/logout.component';
import { ProfileComponent } from './components/site/profile/profile.component';

export const routes: Routes = [
    {
        path: "barrier",
        component: AuthRouterComponent,
        children: [
            { path: "login", component: LoginComponent, pathMatch: "full" },
            { path: "login/totp", component: TotpComponent, pathMatch: "full" },
            { path: "logout", component: LogoutComponent, pathMatch: "full" },
        ]
    },
    {
        path: "",
        component: MainRouterComponent,
        children: [
            { path: "", component: HomeComponent, pathMatch: "full" },
            { path: "profile", component: ProfileComponent, pathMatch: "full" },
            { path: "profile/:username", component: ProfileComponent, pathMatch: "full" },
        ]
    },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
