import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoices } from 'src/app/interfaces/invoices';
import { InvoicesStatus } from 'src/app/interfaces/invoices-status';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices-details',
  templateUrl: './invoices-details.component.html',
  styleUrls: ['./invoices-details.component.scss'],
})
export class InvoicesDetailsComponent implements OnInit {
  constructor(
    private invoicesService: InvoicesService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;
  sub!: Subscription;
  id!: number;
  customerId!: number;
  invoices!: Invoices;
  status!: InvoicesStatus[];

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.invoicesService.getInvoicesById(this.id).subscribe((res) => {
        this.invoices = res;
        console.log(this.invoices);
      });
    });
    this.invoicesService.getInvoiceStatus().subscribe((res) => {
      this.status = res.content;
      console.log(this.status);
    });
    this.formInit();
  }

  updateInvoices(form: any) {
    let newInvoice = this.invoices;
    if (parseInt(form.value.stato.id) === 1) {
      newInvoice.stato.nome = 'PAGATA';
      newInvoice.stato.id = 1;
    } else if (parseInt(form.value.stato.id) === 2) {
      newInvoice.stato.nome = 'NON PAGATA';
      newInvoice.stato.id = 2;
    }
    console.log(newInvoice);
    this.invoicesService.putInvoice(newInvoice, this.id).subscribe();
    form.reset();
  }

  formInit() {
    this.form = this.formBuilder.group({
      stato: this.formBuilder.group({
        id: this.formBuilder.control(null, Validators.required),
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
}
