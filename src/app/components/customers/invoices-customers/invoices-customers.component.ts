import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customers } from 'src/app/interfaces/customers';
import { Invoices } from 'src/app/interfaces/invoices';
import { InvoicesStatus } from 'src/app/interfaces/invoices-status';
import { CustomersService } from 'src/app/services/customers.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices-customers',
  templateUrl: './invoices-customers.component.html',
  styleUrls: ['./invoices-customers.component.scss'],
})
export class InvoicesCustomersComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private invoicesService: InvoicesService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;
  customers!: Customers;
  invoices!: Invoices[];
  sub!: Subscription;
  id!: number;
  status!: InvoicesStatus[];
  pages!: any;

  ngOnInit(): void {
    this.getDetails();
    this.formInit();
  }

  getDetails() {
    this.sub = this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.customersService.getCustomersById(this.id).subscribe((res) => {
        this.customers = res;
        console.log(res);
        this.invoicesService
          .getAllInvoicesByCustomer(this.id, 0)
          .subscribe((res) => {
            this.pages = res;
            this.invoices = res.content;
            console.log(this.invoices);
          });
      });
      this.invoicesService.getInvoiceStatus().subscribe((res) => {
        this.status = res.content;
        console.log(this.status);
      });
    });
  }

  newInvoices(form: any) {
    let newInvoice = form.value.userInfo;
    if (parseInt(newInvoice.stato.id) === 1) {
      newInvoice.stato.nome = 'PAGATA';
    } else if (parseInt(newInvoice.stato.id) === 2) {
      newInvoice.stato.nome = 'NON PAGATA';
    }
    let data = form.value.userInfo.data.slice(0, 4);
    newInvoice.anno = data;
    console.log(newInvoice);
    this.invoicesService.postNewInvoice(newInvoice).subscribe();
    form.reset();
    this.ngOnInit();
  }

  formInit() {
    this.form = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        id: 0,
        data: this.formBuilder.control(null, Validators.required),
        numero: 0,
        importo: this.formBuilder.control(null, Validators.required),
        stato: this.formBuilder.group({
          id: this.formBuilder.control(null, Validators.required),
        }),
        cliente: this.formBuilder.group({
          id: this.id,
        }),
      }),
    });
    console.log(this.form);
  }

  checkForm(req: string) {
    return this.form.get(req);
  }
  getFormErrors(req: string, error: string) {
    return this.form.get(req)?.errors![error];
  }

  removeInvoice(id: number) {
    console.log(id);
    this.invoicesService.deleteInvoice(id).subscribe();
    this.ngOnInit();
  }

  switchPage(id: number, page: number) {
    this.invoicesService.getAllInvoicesByCustomer(id, page).subscribe((res) => {
      this.pages = res;
      this.invoices = res.content;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
