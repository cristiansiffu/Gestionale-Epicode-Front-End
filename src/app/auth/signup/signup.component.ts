import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;
  user = {
    username: '',
    nome: '',
    cognome: '',
    email: '',
    password: '',
    role: [''],
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        username: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        nome: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        cognome: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        email: this.formBuilder.control(null, [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ]*'),
          Validators.minLength(6),
        ]),
        role: this.formBuilder.control(null, Validators.required),
      }),
    });
  }

  signup(form: any) {
    this.user.username = form.value.userInfo.username;
    this.user.nome = form.value.userInfo.nome;
    this.user.cognome = form.value.userInfo.cognome;
    this.user.email = form.value.userInfo.email;
    this.user.password = form.value.userInfo.password;
    this.user.role.splice(0, 1);
    this.user.role.push(form.value.userInfo.role);
    console.log(this.user);
    this.authService.signup(this.user).subscribe((res) => {
      console.log(res);
    });
    form.reset();
  }

  checkUsername(username: string) {
    return this.form.get(username);
  }
  getUsernameErrors(username: string, error: string) {
    return this.form.get(username)?.errors![error];
  }

  checkEmail(email: string) {
    return this.form.get(email);
  }
  getEmailErrors(email: string, error: string) {
    return this.form.get(email)?.errors![error];
  }

  checkPassword(password: string) {
    return this.form.get(password);
  }
  getPasswordErrors(password: string, error: string) {
    return this.form.get(password)?.errors![error];
  }
}
