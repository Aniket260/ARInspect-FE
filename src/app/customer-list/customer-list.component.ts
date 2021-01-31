import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  text='';
config ={
  itemsPerPage: 2,
  currentPage: 1,
  totalItems: 3
}
  customerList:any;
  details= false;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Prev',
      nextLabel: 'Next',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  constructor(
    private _customerService :CustomerService,
    private router: Router
    ) {
      this.getCustomerList();
    }

  ngOnInit(): void {
  }

  getCustomerList(){
    this._customerService.getCustomer(this.config.currentPage, this.config.itemsPerPage, this.text).subscribe((res: any)=>{
      console.log(res)
      this.customerList = res['customerList'];
      this.config.totalItems = res['total'];
    }, err =>{
      console.log(err);
    })
  }

  search(){
    this.customerList = [];
    this.getCustomerList();
  }

  editCustomer(_i: any){
    this.router.navigate(['/form'], {state: {customer: this.customerList[_i]}})
  }

  deleteCustomer(_i: any){
    this._customerService.deleteCustomer(this.customerList[_i]._id).subscribe((res:any)=>{
      this.getCustomerList();
    }, (err: any)=>{
      alert(err.message);
    })
  }

  addCustomer(){
    this.router.navigate(['/form'], {state: {addCustomer: true}});
  }

  addAddress(_i: any){
    this.router.navigate(['/form', this.customerList[_i]._id], {state: {addAddress: true}});
  }

  onCheckboxChange(event: any){
    this.details = event.target.checked;
  }

  editAddress(_i: any, _j: any){
    this.router.navigate(['/form'], {state: {address: this.customerList[_i].address[_j]}});
  }

  deleteAddress(_i: any, _j: any){

    this._customerService.deleteAddress(this.customerList[_i].address[_j]._id).subscribe((res:any)=>{
      this.getCustomerList();
    }, (err: any)=>{
      alert(err.message);
    })
  }

  onPageChange(event){

    this.config.currentPage = event;
    this.getCustomerList();
  }
}
