import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileVisibilityEnum } from '../../../enums/profileVisibilityEnum';

@Component({
  selector: 'app-setting-account-account',
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './setting-account-account.component.html',
  styleUrl: './setting-account-account.component.scss'
})
export class SettingAccountAccountComponent implements OnInit {
  fa = fa;

  profileVisibilityEnum = ProfileVisibilityEnum;

  form: FormGroup = new FormGroup(
    {
      // avatar: new FormControl(),
      // banner: new FormControl(),
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
    console.log(this.form.get('username')?.errors?.['required']);
  }

  submit() {
    console.log(this.form.get('username')?.errors);
    console.log(this.form.value);
  }
}
