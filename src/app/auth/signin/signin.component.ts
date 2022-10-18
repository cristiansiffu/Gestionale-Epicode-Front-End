import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;
  user!: Auth;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        username: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        password: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ]*'),
          Validators.minLength(6),
        ]),
      }),
    });
  }

  signin(form: any) {
    console.log(form.value.userInfo);
    this.authService.signin(form.value.userInfo).subscribe((res) => {
      console.log(res);
      this.user = res;
      localStorage.setItem('User', JSON.stringify(this.user));
    });
    form.reset();
    this.router.navigate(['/']);
  }


  checkUsername(username: string) {
    return this.form.get(username);
  }
  getUsernameErrors(username: string, error: string) {
    return this.form.get(username)?.errors![error];
  }

  checkPassword(password: string) {
    return this.form.get(password);
  }
  getPasswordErrors(password: string, error: string) {
    return this.form.get(password)?.errors![error];
  }
}
