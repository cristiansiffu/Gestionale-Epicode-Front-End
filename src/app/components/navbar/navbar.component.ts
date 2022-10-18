import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  localUser!: boolean;

  ngOnInit(): void {
    this.checkUser()
  }

  logout() {
    this.checkUser()
    this.authService.logout();
  }

  checkUser(): boolean {
    this.localUser = this.authService.getLocalUser()
    return this.localUser
  }
}
