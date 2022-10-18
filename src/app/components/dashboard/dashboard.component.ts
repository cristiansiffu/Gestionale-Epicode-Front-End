import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  localUser!: boolean;

  ngOnInit(): void {
    this.checkUser()
  }

  checkUser(): boolean {
    this.localUser = this.authService.getLocalUser()
    return this.localUser
  }

}
