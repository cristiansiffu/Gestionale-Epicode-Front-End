import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Municipalities } from '../interfaces/municipalities';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  URL = environment.pathApi

  getCustomers() {
    return this.http.get<any>(`${this.URL}/api/clienti`);
  }

  getAllCustomers(page: number) {
    return this.http.get<any>(`${this.URL}/api/clienti?page=${page}&size=20&sort=id,ASC`);
  }

  getMunicipalities() {
    return this.http.get<any>(`${this.URL}/api/comuni?page=0&size=20&sort=id,ASC`);
  }
  getProvinces() {
    return this.http.get<any>(`${this.URL}/api/province?page=0&size=20&sort=id,ASC`);
  }

  getCustomersById(id: number) {
    return this.http.get<any>(`${this.URL}/api/clienti/${id}`);
  }

  registerCustomers(data: any){
    return this.http.post<any>(`${this.URL}/api/clienti`, data);
  }

  updateCustomers(id: number, data: any){
    return this.http.put<any>(`${this.URL}/api/clienti/${id}`, data);
  }

  deleteCustomers(id: number) {
    return this.http.delete(`${this.URL}/api/clienti/${id}`);
  }
}
