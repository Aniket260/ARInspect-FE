import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  addCustomer(body: any){
    return this.http.post(`${environment.baseurl}/api/v1/customer`, body);
  }

  getCustomer(pageNumber: any, pageSize: any, text: any){
    return this.http.get(`${environment.baseurl}/api/v1/customer/filter?pageNumber=${pageNumber}&pageSize=${pageSize}&text=${text}`);
  }

  editCustomer(customerId: any, body: any){
    return this.http.put(`${environment.baseurl}/api/v1/customer/${customerId}`, body);
  }

  deleteCustomer(customerId: any){
    return this.http.delete(`${environment.baseurl}/api/v1/customer/${customerId}`);
  }

  getCustomerById(customerId: any){
    return this.http.get(`${environment.baseurl}/api/v1/customer?customerId=${customerId}`);
  }

  deleteAddress(addressId: any){
    return this.http.delete(`${environment.baseurl}/api/v1/address/${addressId}`);
  }

  addAddress(body: any){
    return this.http.post(`${environment.baseurl}/api/v1/address`, body);
  }

  editAddress(addressId: any, body: any){
    return this.http.put(`${environment.baseurl}/api/v1/address/${addressId}`, body);
  }
}
