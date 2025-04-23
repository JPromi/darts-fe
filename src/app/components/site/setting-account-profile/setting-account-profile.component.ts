import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileVisibilityEnum } from '../../../enums/profileVisibilityEnum';
import { SettingsService } from '../../../services/settings.service';
import { SettingProfile } from '../../../entities/settingProfile';
import { Observable } from 'rxjs';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-setting-account-profile',
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './setting-account-profile.component.html',
  styleUrl: './setting-account-profile.component.scss'
})
export class SettingAccountProfileComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private fileService: FileService,
  ) { }

  fa = fa;

  profileVisibilityEnum = ProfileVisibilityEnum;

  profile: SettingProfile = new SettingProfile();
  isLoaded: boolean = false;
  isUpdating: boolean = false;

  form: FormGroup = new FormGroup(
    {
      username: new FormControl<string>("",  [Validators.required]),
      description: new FormControl<string>(""),
      country: new FormControl<string>(""),
      visibility: new FormControl<ProfileVisibilityEnum>(ProfileVisibilityEnum.PUBLIC),
      l_web: new FormControl<string>(""),
      l_x: new FormControl<string>(""),
      l_instagram: new FormControl<string>(""),
      l_github: new FormControl<string>(""),
      l_youtube: new FormControl<string>(""),
      l_twitch: new FormControl<string>(""),
      l_facebook: new FormControl<string>(""),
    }
  );

  ngOnInit(): void {
    this.getProfile();
  }

  updateAvatar(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file) {
      this.fileService.uploadImage(file).subscribe(
        (response) => {
          this.profile.avatar = response;
        },
        (error) => {
          console.error("Error uploading file", error);
        }
      );
    }
  }

  removeAvatar() {
    this.profile.avatar = null;
    this.form.patchValue({
      avatar: null
    });
  }

  updateBanner(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file) {
      this.fileService.uploadImage(file).subscribe(
        (response) => {
          this.profile.banner = response;
        },
        (error) => {
          console.error("Error uploading file", error);
        }
      );
    }
  }

  removeBanner() {
    this.profile.banner = null;
    this.form.patchValue({
      banner: null
    });
  }

  getFirstErrorKey(controlName: string | null | undefined): string | null {
    if(controlName) {
      const errors = this.form.get(controlName)?.errors;
      return errors ? Object.keys(errors)[0] : null;
    } else {
      return null;
    }
  }

  submit() {
    if (this.form.valid) {
      this.isUpdating = true;
      this.profile.username = this.form.value.username;
      this.profile.description = this.form.value.description;
      this.profile.country = this.form.value.country;
      this.profile.visibility = this.form.value.visibility;
      this.profile.links.web = this.form.value.l_web;
      this.profile.links.x = this.form.value.l_x;
      this.profile.links.instagram = this.form.value.l_instagram;
      this.profile.links.github = this.form.value.l_github;
      this.profile.links.youtube = this.form.value.l_youtube;
      this.profile.links.twitch = this.form.value.l_twitch;
      this.profile.links.facebook = this.form.value.l_facebook;
      
      this.settingsService.updateProfileSettings(this.profile).subscribe({
        next: () => {
          this.isUpdating = false;
          console.log("Profile updated successfully");
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  private getProfile() {
    this.isLoaded = false;
    this.settingsService.getProfileSettings().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.form.patchValue({
          avatar: profile.avatar?.filename,
          banner: profile.banner?.filename,
          username: profile.username,
          description: profile.description,
          country: profile.country,
          visibility: profile.visibility,
          l_web: profile.links.web,
          l_x: profile.links.x,
          l_instagram: profile.links.instagram,
          l_github: profile.links.github,
          l_youtube: profile.links.youtube,
          l_twitch: profile.links.twitch,
          l_facebook: profile.links.facebook,
        });
        this.isLoaded = true;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}