import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from './auth';
import { BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  URL = environment.pathApi;
  private subject = new BehaviorSubject<null | Auth>(null);
  user$ = this.subject.asObservable();

  signin(userData: { username: string; password: string }) {
    return this.http.post<Auth>(`${this.URL}/api/auth/login`, userData)
  }

  signup(userData: any) {
    return this.http.post<any>(`${this.URL}/api/auth/signup`, userData)
  }

  logout() {
    this.subject.next(null);
    localStorage.removeItem('User');
    this.router.navigate(['/signin']);
  }

  getLocalUser(): boolean {
    return localStorage.getItem('User') != null;
  }
}
