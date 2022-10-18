import { Injectable } from '@angular/core';
import { Auth } from '../auth/auth';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  URL = environment.pathApi

  getAllUsers(page: number) {
    return this.http.get<any>(`${this.URL}/api/users?page=${page}`);
  }
}
