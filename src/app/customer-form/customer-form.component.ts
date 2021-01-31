import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  providers: [CustomerService],
})
export class CustomerFormComponent implements OnInit {
  customer: any = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  };
  address: any = {
    isPrimary: false,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  };
  updateCustomerButton = false;
  updateAddressButton = false;
  addAddress = false;
  addCustomerButton = false;
  customerId: any;
  addressId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _customerService: CustomerService
  ) {
    this.customer =
      this.router.getCurrentNavigation().extras.state != null
        ? this.router.getCurrentNavigation().extras.state.customer
        : {};
    this.addCustomerButton =
      this.router.getCurrentNavigation().extras.state != null
        ? this.router.getCurrentNavigation().extras.state.addCustomer
        : false;
    this.address =
      this.router.getCurrentNavigation().extras.state != null
        ? this.router.getCurrentNavigation().extras.state.address
        : {};
  }

  ngOnInit(): void {
    ;
    this.customerId = this.route.snapshot.params['customerId'];
    if (
      this.customer !== undefined &&
      Object.keys(this.customer).length !== 0 &&
      this.customer.constructor === Object
    ) {
      this.updateCustomerButton = true;
    } else if (
      this.address !== undefined &&
      Object.keys(this.address).length !== 0 &&
      this.address.constructor === Object
    ) {
      this.updateAddressButton = true;
    } else if (this.customerId) {
      this.addAddress = true;
    }
    if (
      !this.updateCustomerButton &&
      !this.updateAddressButton &&
      !this.addAddress &&
      !this.addCustomerButton
    ) {
      this.addCustomerButton = true;
    }
  }

  getCustomerList() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.addAddress) {
      this.address.customerId = this.customerId;
      this._customerService.addAddress(this.address).subscribe(
        (res: any) => {
          this.getCustomerList();
        },
        (err: any) => {
          alert(err.message);
        }
      );
    }
    if (this.addCustomerButton) {
      this.customer = {
        isPrimary: this.address.isPrimary,
        addressLine1: this.address.addressLine1,
        addressLine2: this.address.addressLine2,
        city: this.address.city,
        state: this.address.state,
        country: this.address.country,
        zipCode: this.address.zipCode,
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        emailAddress: this.customer.emailAddress,
        phoneNumber: this.customer.phoneNumber,
      };
      this._customerService.addCustomer(this.customer).subscribe(
        (res: any) => {
          this.getCustomerList();
        },
        (err: any) => {
          alert(err.message);
        }
      );
    }
    if (this.updateAddressButton) {
      this.addressId = this.address._id;
      this.address = {
        isPrimary: this.address.isPrimary,
        addressLine1: this.address.addressLine1,
        addressLine2: this.address.addressLine2,
        city: this.address.city,
        state: this.address.state,
        country: this.address.country,
        zipCode: this.address.zipCode,
      };
      this._customerService.editAddress(this.addressId, this.address).subscribe(
        (res: any) => {
          this.getCustomerList();
        },
        (err: any) => {
          alert(err.message);
        }
      );
    }
    if (this.updateCustomerButton) {
      this.customerId = this.customer._id;
      this.customer = {
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        emailAddress: this.customer.emailAddress,
        phoneNumber: this.customer.phoneNumber,
      };
      this._customerService
        .editCustomer(this.customerId, this.customer)
        .subscribe(
          (res: any) => {
            this.getCustomerList();
          },
          (err: any) => {
            alert(err.message);
          }
        );
    }
  }
}
