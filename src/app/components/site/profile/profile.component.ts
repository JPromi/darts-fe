import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionAccountResponse } from '../../../dtos/sessionAccountResponse';
import { LoStorageService } from '../../../services/local/lo-storage.service';
import { ProfileResponse } from '../../../dtos/profileResponse';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private loStorageService: LoStorageService,
    private profileService: ProfileService
  ) { }

  public isOwnProfile = false;
  public sessionAccount: SessionAccountResponse | null = null;

  public profie!: ProfileResponse;

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      let username = params['username'];
      
      this.loStorageService.sessionAccount$.subscribe(
        (sessionAccount) => {
          this.sessionAccount = sessionAccount;
          
          if(!username || username === this.sessionAccount?.username) {
            this.isOwnProfile = true;
            if(this.sessionAccount) {
              username = this.sessionAccount.username;
            }
          } else {
            this.isOwnProfile = false;
          }

          // load profile
          this.getProfile(username);
        }
      );
    });
  }

  private getProfile(username: string) {
    this.profileService.getProfile(username).subscribe(
      (response) => {
        this.profie = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
