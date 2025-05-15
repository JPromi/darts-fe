import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { LoValidationService } from '../../../services/local/lo-validation.service';
import { RegistrationRequest } from '../../../dtos/registrationRequest';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private loValidationService: LoValidationService,
    private registerService: RegisterService
  ) { }

  fa = fa;

  registrationForm = new FormGroup(
    {
      username: new FormControl<string>("", [Validators.required]),
      password: new FormControl<string>("", [Validators.required]),
      passwordConfirm: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [Validators.required, Validators.email]),
      firstName: new FormControl<string>("", [Validators.required]),
      lastName: new FormControl<string>("", [Validators.required]),
      dateOfBirth: new FormControl<Date | null>(null, [Validators.required]),
    },
    this.loValidationService.passwordMatch('password', 'passwordConfirm')
  )

  registration: RegistrationRequest = new RegistrationRequest();

  isSending: boolean = false;

  ngOnInit(): void {
    
  }

  public onSubmit() {
    this.registrationForm.markAllAsTouched();
    
    if (this.registrationForm.valid) {
       this.registrationForm.updateValueAndValidity();
      this.registrationForm.disable();
      this.isSending = true;
      this.registration.username = this.registrationForm.value.username!;
      this.registration.password = this.registrationForm.value.password!;
      this.registration.email = this.registrationForm.value.email!;
      this.registration.firstName = this.registrationForm.value.firstName!;
      this.registration.lastName = this.registrationForm.value.lastName!;
      this.registration.dateOfBirth = new Date(this.registrationForm.value.dateOfBirth!);

      this.registerService.register(this.registration).subscribe(
        (response) => {
          this.isSending = false;
          this.registrationForm.enable();
          console.log(response);
        },
        (error) => {
          this.isSending = false;
          this.registrationForm.enable();
          console.error(error);
        }
      );
    }
  }

  public getFirstErrorKey(controlName: string | null | undefined): string | null {
    if(controlName) {
      const errors = this.registrationForm.get(controlName)?.errors;
      return errors ? Object.keys(errors)[0] : null;
    } else {
      return null;
    }
  }
}
