import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customers } from 'src/app/interfaces/customers';
import { Municipalities } from 'src/app/interfaces/municipalities';
import { Provinces } from 'src/app/interfaces/provinces';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.scss'],
})
export class ManageCustomersComponent implements OnInit {
  constructor(
    private customersService: CustomersService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute
  ) {}

  form!: FormGroup;
  comuni!: Municipalities[];
  province!: Provinces[];
  id!: number;
  sub!: Subscription;
  customers!: Customers;

  ngOnInit(): void {
    this.getDetails();
    this.customersService.getMunicipalities().subscribe((res) => {
      this.comuni = res.content;
    });
    this.customersService.getProvinces().subscribe((res) => {
      this.province = res.content;
    });
    this.formInit();
  }

  update(form: any) {
    console.log(form.value.userInfo);
    this.customersService
      .updateCustomers(this.id, form.value.userInfo)
      .subscribe();
    form.reset();
  }

  getDetails() {
    this.sub = this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.customersService.getCustomersById(this.id).subscribe((res) => {
        this.customers = res;
        console.log(res);
      });
    });
  }

  formInit() {
    this.form = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        nomeContatto: this.formBuilder.control(null, Validators.required),
        cognomeContatto: this.formBuilder.control(null, Validators.required),
        email: this.formBuilder.control(null, Validators.required),
        emailContatto: this.formBuilder.control(null, Validators.required),
        telefono: this.formBuilder.control(null, Validators.required),
        telefonoContatto: this.formBuilder.control(null, Validators.required),
        pec: this.formBuilder.control(null, Validators.required),
        partitaIva: this.formBuilder.control(null, Validators.required),
        ragioneSociale: this.formBuilder.control(null, Validators.required),
        tipoCliente: this.formBuilder.control(null, Validators.required),
        indirizzoSedeOperativa: this.formBuilder.group({
          via: this.formBuilder.control(null, Validators.required),
          civico: this.formBuilder.control(null, Validators.required),
          cap: this.formBuilder.control(null, Validators.required),
          localita: this.formBuilder.control(null, Validators.required),
          comune: this.formBuilder.group({
            id: this.formBuilder.control(null, Validators.required),
            provincia: this.formBuilder.group({
              id: this.formBuilder.control(null, Validators.required),
            }),
          }),
        }),
        indirizzoSedeLegale: this.formBuilder.group({
          via: this.formBuilder.control(null, Validators.required),
          civico: this.formBuilder.control(null, Validators.required),
          cap: this.formBuilder.control(null, Validators.required),
          localita: this.formBuilder.control(null, Validators.required),
          comune: this.formBuilder.group({
            id: this.formBuilder.control(null, Validators.required),
            provincia: this.formBuilder.group({
              id: this.formBuilder.control(null, Validators.required),
            }),
          }),
        }),
        dataInserimento: this.formBuilder.control(null, Validators.required),
        dataUltimoContatto: this.formBuilder.control(null, Validators.required),
        fatturatoAnnuale: this.formBuilder.control(null, Validators.required),
      }),
    });
  }

  checkForm(req: string) {
    return this.form.get(req);
  }
  getFormErrors(req: string, error: string) {
    return this.form.get(req)?.errors![error];
  }
}
