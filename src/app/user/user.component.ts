import { Component, OnInit } from '@angular/core';
import { UserModel } from './user.model';
import{Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isUsername: boolean;
  isEmail: boolean;
  isMobileNumber: boolean;
  isAddress: boolean;
  isPincode: boolean;
  isCity: boolean;
  isState: boolean;
  isEmailValid: boolean;
  isValidMobileNumber: boolean;
  isValidPincode: boolean;
  userDetail: any;

  constructor(public route: Router) { 
    this.userDetail = new UserModel();
    this.isEmailValid = true;
    this.isValidPincode = true;
    this.isValidMobileNumber = true;
  }

  ngOnInit() {
  }

  /**
   * Method for save button 
   */
  saveUserInformation(){
    this.isUsername = this.userDetail.userName === null || this.userDetail.userName === '' || this.userDetail.userName === undefined ? true : false;
    this.isEmail = this.userDetail.email === null || this.userDetail.email === '' || this.userDetail.email === undefined ? true : false;
    this.isMobileNumber = this.userDetail.mobileNumber === null || this.userDetail.mobileNumber === '' || this.userDetail.mobileNumber === undefined ? true : false;
    this.isAddress = this.userDetail.address === null || this.userDetail.address === '' || this.userDetail.address === undefined ? true : false;
    this.isPincode = this.userDetail.pincode === null || this.userDetail.pincode === '' || this.userDetail.pincode === undefined ? true : false;
    this.isCity = this.userDetail.city === null || this.userDetail.city === '' || this.userDetail.city === undefined ? true : false;

    if(!this.isUsername && !this.isEmail && !this.isMobileNumber && !this.isAddress && !this.isPincode && !this.isCity){
      localStorage.setItem('userDetailKey', this.userDetail);
      console.log(this.userDetail);
      this.route.navigateByUrl('/cart');
    }
  }

  /**
   * Method to check whether email entered is valid or not
   * @param email contains the email entered by the user
   */
  onEmailValid(email: string) {
    if (email != '') {
      this.isEmail = false;
      if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        this.isEmailValid = false;
      }
      else
        this.isEmailValid = true;
    }
  }

  /**
   * Method to check whether pincode entered is valid or not
   * @param pincode contains the pincode entered by the user
   */
  onPinCodeValid(pincode: string){
    if(pincode != ''){
      this.isPincode = false;
      if(!pincode.match(/^\d{6,}$/)){
        this.isValidPincode = false;
      }
      else
      this.isValidPincode = true;
    }
  }

  /**
   * Method to check whether mobile number entered is valid or not
   * @param mobileNumber contains the mobile number entered by the user
   */
  onMobileNumberValid(mobileNumber: string){
    if(mobileNumber != ''){
      this.isMobileNumber = false;
      if(!mobileNumber.match(/^[6-9]\d{9}$/)){
        this.isValidMobileNumber = false;
      }
      else
      this.isValidMobileNumber = true;
    }
  }

}
