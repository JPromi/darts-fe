import { Routes } from '@angular/router';
import { AuthRouterComponent } from './components/routes/auth-router/auth-router.component';
import { LoginComponent } from './components/site/login/login.component';
import { TotpComponent } from './components/site/totp/totp.component';
import { MainRouterComponent } from './components/routes/main-router/main-router.component';
import { HomeComponent } from './components/site/home/home.component';
import { LogoutComponent } from './components/site/logout/logout.component';
import { ProfileComponent } from './components/site/profile/profile.component';
import { SettingAccountRouterComponent } from './components/routes/setting-account-router/setting-account-router.component';
import { SettingAccountProfileComponent } from './components/site/setting-account-profile/setting-account-profile.component';
import { SettingAccountAccountComponent } from './components/site/setting-account-account/setting-account-account.component';
import { GameInputComponent } from './components/site/game-input/game-input.component';
import { GroupListComponent } from './components/site/group-list/group-list.component';
import { RegisterComponent } from './components/site/register/register.component';

export const routes: Routes = [
    {
        path: "barrier",
        component: AuthRouterComponent,
        children: [
            { path: "register", component: RegisterComponent, pathMatch: "full" },
            { path: "login", component: LoginComponent, pathMatch: "full" },
            { path: "login/totp", component: TotpComponent, pathMatch: "full" },
            { path: "logout", component: LogoutComponent, pathMatch: "full" },
        ]
    },
    {
        path: "game/active",
        children: [
            { path: "", component: GameInputComponent, pathMatch: "full" },
        ]
    },
    {
        path: "",
        component: MainRouterComponent,
        children: [
            { path: "", component: HomeComponent, pathMatch: "full" },
            { path: "profile", component: ProfileComponent, pathMatch: "full" },
            { path: "profile/:username", component: ProfileComponent, pathMatch: "full" },
            { 
                path: "settings",
                component: SettingAccountRouterComponent,
                children: [
                    { path: "", redirectTo: "profile", pathMatch: "full" },
                    { path: "profile", component: SettingAccountProfileComponent, pathMatch: "full" },
                    { path: "account", component: SettingAccountAccountComponent, pathMatch: "full" },
                ]
            },
            { path: "group", component: GroupListComponent, pathMatch: "full" },
            { path: "group/:uuid", component: GroupListComponent, pathMatch: "full" },
        ]
    },
    { path: "**", redirectTo: "", pathMatch: "full" }
];
