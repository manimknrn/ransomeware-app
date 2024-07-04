import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5000/api/customers';

  constructor(private http: HttpClient) { }

  registerCustomer(customerId: any): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customerId);
  }

  deleteCustomer(id: number, data: any): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/${id}/`, data);
  }

  updateCustomer(id: number, data: any): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/${id}/`, data);
  }

  getCustomers(): Observable<Customer[]> {
    // const apiUrl = 'https://github.com/codingo/Ransomware-Json-Dataset/blob/master/ransomware_overview.json';
    // due to CORS connectivity issue with gihub domain mock the response on assets
    const apiUrl = '/assets/ransomware-data.json';
    return this.http.get<Customer[]>(apiUrl);
  }

  getFormConfig(): Observable<any> {
    return this.http.get('/assets/form-config.json');
  }
}
