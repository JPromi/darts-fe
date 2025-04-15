import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { LoStorageService } from './services/local/lo-storage.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [
      RouterOutlet,
      CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'Darts';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private loStorageService: LoStorageService
  ) {
    this.translate.addLangs(['de-AT', 'en-US']);
    this.translate.setDefaultLang('de-AT');
    this.translate.use('de-AT');
  }

  public isLoading: boolean = true;

  ngAfterViewInit(): void {
    setTimeout(() => {this.redirectTotp()}, 0);
  }

  private redirectTotp() {
    this.authService.loginSession().subscribe(
      (response) => {
        if (response.totpRequired) {
          this.isLoading = false;
          this._navigate('/barrier/login/totp', ['/barrier/logout']);
        } else {
          this.getSession();
        }
      },
      (error) => {
        this.isLoading = false;
        this.loStorageService.setSessionAccount(null);
      }
    );
  }

  private getSession() {
    this.authService.session().subscribe(
      (response) => {
        this.loStorageService.setSessionAccount(response);
        this.isLoading = false;
      },
      (error) => {
        this.loStorageService.setSessionAccount(null);
        this.isLoading = false;
      }
    );
  }

  private _navigate(url: string, ignoreList: string[]) {
    if (ignoreList.includes(this.router.url)) {
      return;
    }

    this.router.navigate([url]);
  }
}
