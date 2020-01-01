import { Component, OnInit } from '@angular/core';
import { cartModel } from '../cart/cart.model';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutCart: cartModel[]=[];
  userDetail: UserModel;
  userString;
  cartString
  constructor() { }

  ngOnInit() {
    this.userString = localStorage.getItem('userDetailKey');
    this.userDetail = JSON.parse(this.userString);
    
    this.cartString = localStorage.getItem('selectedCartItemKey');
    this.checkoutCart = JSON.parse(this.cartString);
  }

}
