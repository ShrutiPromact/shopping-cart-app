import { Component, OnInit } from '@angular/core';
import { cartModel } from '../cart/cart.model';
import { UserModel } from '../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutCart: cartModel[]=[];
  userDetail: UserModel;
  userString;
  cartString;
  constructor(public route: Router) { }

  ngOnInit() {
    this.userString = localStorage.getItem('userDetailKey');
    this.userDetail = JSON.parse(this.userString);
    
    this.cartString = localStorage.getItem('selectedCartItemKey');
    this.checkoutCart = JSON.parse(this.cartString);
  }

  /**
   * Method for navigate to payment page
   */
  navigateToPaymentPage(){
    this.route.navigateByUrl('/payment');
  }

  /**
   * Method for delete cart
   */
  deleteCart(detetCheckoutCart: cartModel){
    this.checkoutCart.splice(this.checkoutCart.indexOf(detetCheckoutCart), 1);
    localStorage.setItem('selectedCartItemKey', JSON.stringify(this.checkoutCart));
    localStorage.setItem('selectedCartItemCount',  this.checkoutCart.length.toString());
  }
}
