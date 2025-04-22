import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-setting-account-router',
  imports: [
    RouterOutlet,
    RouterModule,
    TranslateModule,
    FontAwesomeModule
  ],
  templateUrl: './setting-account-router.component.html',
  styleUrl: './setting-account-router.component.scss'
})
export class SettingAccountRouterComponent {
  fa = fa;
}
