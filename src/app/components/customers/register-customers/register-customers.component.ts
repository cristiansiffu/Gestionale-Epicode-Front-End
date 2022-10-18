import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Municipalities } from 'src/app/interfaces/municipalities';
import { Provinces } from 'src/app/interfaces/provinces';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-register-customers',
  templateUrl: './register-customers.component.html',
  styleUrls: ['./register-customers.component.scss'],
})
export class RegisterCustomersComponent implements OnInit {
  constructor(
    private customerService: CustomersService,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;
  comuni!: Municipalities[];
  province!: Provinces[];

  ngOnInit(): void {
    this.customerService.getMunicipalities().subscribe((res) => {
      this.comuni = res.content;
    });
    this.customerService.getProvinces().subscribe((res) => {
      this.province = res.content;
    });
    this.formInit();
  }

  register(form: any) {
    console.log(form.value.userInfo);
    this.customerService
      .registerCustomers(form.value.userInfo)
      .subscribe((res) => {
        form = res;
      });
    form.reset();
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
