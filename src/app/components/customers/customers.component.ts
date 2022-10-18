import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {}

  customers!: any;
  pages!: any;

  ngOnInit(): void {
    this.customersService.getAllCustomers(0).subscribe((res) => {
      this.pages = res;
      this.customers = res.content;
      console.log(this.customers);
    });
  }

  getById(id: number) {
    console.log(id);
    this.customersService.getCustomersById(id);
    this.router.navigate([`/customers/${id}`]);
  }

  putById(id: number) {
    console.log(id);
    this.customersService.getCustomersById(id);
    this.router.navigate([`/customers/manage-customers/${id}`]);
  }

  removeCustomer(id: number) {
    let removed = confirm('Are you sure?');
    if (removed === true) {
      alert('Deleted successfully');
      console.log(id);
      this.customersService.deleteCustomers(id).subscribe();
      this.ngOnInit();
    }
  }

  switchPage(page: number) {
    this.customersService.getAllCustomers(page).subscribe((res) => {
      this.pages = res;
      this.customers = res.content;
    });
  }
}
