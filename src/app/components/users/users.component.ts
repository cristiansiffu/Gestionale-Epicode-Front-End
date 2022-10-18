import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/auth/auth';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UsersService) {}

  users!: Auth[];
  pages!: any;

  ngOnInit(): void {
    this.userService.getAllUsers(0).subscribe((res) => {
      console.log(res)
      this.pages = res;
      this.users = res.content;
      console.log(this.users)
    });
  }

  switchPage(page: number) {
    this.userService.getAllUsers(page).subscribe((res) => {
      this.pages = res;
      this.users = res.content;
    });
  }
}
