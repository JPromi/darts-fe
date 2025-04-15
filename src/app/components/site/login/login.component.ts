import { Component, OnInit } from '@angular/core';
import { Login } from '../../../entities/login';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../dtos/loginRequest';
import { LoginResponse } from '../../../dtos/loginResponse';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PastUser } from '../../../entities/pastUser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  public loginObject: Login = new Login();
  public loginResponse?: LoginResponse;
  public isLoading: boolean = false;
  public isPasswordVisible: boolean = false;
  public isSavedUser: boolean = false;
  public lastUsers: PastUser[] = [];

  ngOnInit(): void {
    this.getLastUsers();
  }

  public login() {
    const request: LoginRequest = LoginRequest.fromLogin(this.loginObject);
    
    this.loginResponse = undefined;
    this.isLoading = true;

    this.authService.login(request).subscribe(
      (response) => {
        this.setSession(response);
        this.loginResponse = response;
        this.isLoading = false;
        if(response.totpRequired) {
          this.router.navigate(['/barrier/login/totp']);
        }
      },
      (error) => {
        this.loginResponse = error.error;
        this.isLoading = false;
      }
    );
  }

  public selectUser(user: PastUser) {
    this.loginObject.username = user.username;
    this.isSavedUser = false;
  }

  private getLastUsers() {
    const lastUsers = localStorage.getItem('b2h.darts.lastUsers');
    if (lastUsers) {
      const lastUsersArray = JSON.parse(lastUsers);
      if (lastUsersArray.length > 0) {
        this.lastUsers = lastUsersArray;
        this.isSavedUser = true;
      }
    }
  }

  private setSession(loginResponse: LoginResponse) {
    this.cookieService.set('b2h.darts.session', loginResponse.token, 0, '/', '.jpromi.com', true, 'Strict');
  }
}
