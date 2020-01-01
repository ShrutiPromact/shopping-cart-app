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
  constructor() { }

  ngOnInit() {
    this.userString = localStorage.getItem('userDetailKey');
    this.userDetail = JSON.parse(this.userString);
    console.log(this.userDetail);
    
    var cartString = localStorage.getItem('selectedCartItemKey');
    this.checkoutCart = JSON.parse(cartString);
    console.log(this.checkoutCart);
  }

}
