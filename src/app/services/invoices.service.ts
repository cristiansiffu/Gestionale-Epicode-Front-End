import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  URL = environment.pathApi;

  getInvoices() {
    return this.http.get<any>(`${this.URL}/api/fatture`);
  }

  getAllInvoices(page: number) {
    return this.http.get<any>(
      `${this.URL}/api/fatture?page=${page}&size=20&sort=id,ASC`
    );
  }

  getInvoiceStatus(){
    return this.http.get<any>(`${this.URL}/api/statifattura`);
  }

  getInvoicesById(id: number) {
    return this.http.get<any>(`${this.URL}/api/fatture/${id}`);
  }

  getInvoicesByCustomer(id: number) {
    return this.http.get<any>(`${this.URL}/api/fatture/cliente/${id}?page=0&size=20&sort=id,ASC`);
  }

  getAllInvoicesByCustomer(id: number, page: number) {
    return this.http.get<any>(`${this.URL}/api/fatture/cliente/${id}?page=${page}&size=20&sort=id,ASC`);
  }

  getInvoicesByYear(year: number) {
    return this.http.get<any>(`${this.URL}/api/fatture/anno/?anno=${year}`);
  }

  deleteInvoice(id: number) {
    return this.http.delete<any>(`${this.URL}/api/fatture/${id}`);
  }

  putInvoice(data: any, id: number) {
    return this.http.put<any>(`${this.URL}/api/fatture/${id}`, data);
  }

  postNewInvoice(data: any) {
    return this.http.post<any>(`${this.URL}/api/fatture`, data);
  }
}
