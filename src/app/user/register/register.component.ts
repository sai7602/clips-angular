import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  inSubmission = false;

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl<string>('', [Validators.email, Validators.required]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.pattern(''),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber,
  });

  showAlert = false;
  alertMsg = 'Please Wait! Your account is being created.';
  alertColor = 'blue';

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please Wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (error) {
      console.log(error);
      this.alertMsg = 'An unexpected error occurred. Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }
    this.alertMsg = 'success';
    this.alertColor = 'green';
  }
}
