import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  constructor(private invoicesService: InvoicesService) {}

  invoices!: any;
  pages!: any;

  ngOnInit(): void {
    this.invoicesService.getAllInvoices(0).subscribe((res) => {
      console.log(res)
      this.pages = res;
      this.invoices = res.content;
    });
  }

  getById(id: number) {
    this.invoicesService.getInvoicesById(id);
    console.log(id);
  }

  switchPage(page: number) {
    this.invoicesService.getAllInvoices(page).subscribe((res) => {
      this.pages = res
      this.invoices = res.content;
    });
  }
}
