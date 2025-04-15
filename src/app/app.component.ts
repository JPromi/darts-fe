import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Darts';

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['de-AT', 'en-US']);
    this.translate.setDefaultLang('de-AT');
    this.translate.use('de-AT');
  }
}
