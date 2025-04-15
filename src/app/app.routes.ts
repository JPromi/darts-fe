import { Routes } from '@angular/router';
import { AuthRouterComponent } from './components/routes/auth-router/auth-router.component';
import { LoginComponent } from './components/site/login/login.component';
import { TotpComponent } from './components/site/totp/totp.component';

export const routes: Routes = [
    {
        path: "barrier",
        component: AuthRouterComponent,
        children: [
            { path: "login", component: LoginComponent, pathMatch: "full" },
            { path: "login/totp", component: TotpComponent, pathMatch: "full" },
        ]
    },
    { path: "**", redirectTo: "barrier/login", pathMatch: "full" }
];
