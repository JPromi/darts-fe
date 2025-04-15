import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{
  title = 'Darts';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService,
    private loStorageService: LoStorageService,
  ) {
    this.translate.addLangs(['de-AT', 'en-US']);
    this.translate.setDefaultLang('de-AT');
    this.translate.use('de-AT');
  }

  public isLoading: boolean = true;

  ngOnInit(): void {
    this.getSession();
  }

  private getSession(): void {
    this.authService.session().subscribe(
      (response) => {
        this.loStorageService.setSessionAccount(response);
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      (error) => {
        this.router.navigate(['/barrier/login']);
        this.isLoading = false;
      }
    );
  }
}
