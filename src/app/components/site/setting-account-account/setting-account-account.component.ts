import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { LoValidationService } from '../../../services/local/lo-validation.service';

@Component({
  selector: 'app-setting-account-account',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    FontAwesomeModule
  ],
  templateUrl: './setting-account-account.component.html',
  styleUrl: './setting-account-account.component.scss'
})
export class SettingAccountAccountComponent implements OnInit {

  constructor(
    private loValidationService: LoValidationService,
  ) {}

  fa = fa;

  form: FormGroup = new FormGroup(
    {
      firstName: new FormControl<string>("", [Validators.required]),
      lastName: new FormControl<string>(""),
      email: new FormControl<string>("", [Validators.required, Validators.email]),
      passwordOld: new FormControl<string>(""),
      password: new FormControl<string>(""),
      passwordConfirm: new FormControl<string>(""),
    },
    this.loValidationService.passwordMatch('password', 'passwordConfirm')
  );

  ngOnInit(): void {
  }

  submit() {

  }

  getFirstErrorKey(controlName: string | null | undefined): string | null {
    if(controlName) {
      const errors = this.form.get(controlName)?.errors;
      return errors ? Object.keys(errors)[0] : null;
    } else {
      return null;
    }
  }
  
}
