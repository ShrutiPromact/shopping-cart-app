import { Component, OnInit } from '@angular/core';
import data from '../cart.json';
import { cartModel } from './cart.model.js';
import { CheckoutComponent } from '../checkout/checkout.component';
import{Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDetail: cartModel[];
  duplicateCartDetail: cartModel[];
  colorFilter = { Red: false, Blue: false };
  priceFilter = { 499: false, 999: false, 1499: false, 2000: false };
  itemCount = 0;
  selectedCartItemArray: cartModel[]=[];
  searchFilterArray: cartModel[];
  isCountAnimation: boolean;

  constructor(public route: Router) { 
    this.cartDetail = [];
  }

  ngOnInit() {
    this.cartDetail=data;
    this.duplicateCartDetail = this.cartDetail;
    this.selectedCartItemArray = JSON.parse(localStorage.getItem('selectedCartItemKey'));
    this.itemCount = parseInt(localStorage.getItem('selectedCartItemCount'));
  }

  /** 
   * Method for select category
   */
  filterCategory(category: string){
    this.cartDetail = this.duplicateCartDetail;
    this.cartDetail = this.cartDetail.filter(x => x.category === category); 
  }
  
  /** 
   * Method for select Price
   */
  selectPrice(price: number){
    this.cartDetail = this.duplicateCartDetail;

      if(price <= 499){
        this.cartDetail = this.cartDetail.filter(x => x.price <= price); 
      }     
      else if( price <= 999){
        this.cartDetail = this.cartDetail.filter(x => x.price <= price); 
      }
      else if(price <= 1499){
        this.cartDetail = this.cartDetail.filter(x => x.price <= price); 
      }
      else if(price <= 2000){
        this.cartDetail;
      }
  }

  /** 
   * Method for select Color
   */
  selectColor(){
    this.cartDetail = this.duplicateCartDetail;
    if(this.colorFilter.Red||this.colorFilter.Blue){
      this.cartDetail = this.cartDetail.filter(x => (x.color === 'Red' && this.colorFilter.Red) || (x.color === 'Blue' && this.colorFilter.Blue));
    }    
  }

  /** 
   * Method for add to cart button
   */
  addCartItem(itemDetail: cartModel){
    this.selectedCartItemArray.push(itemDetail);
    this.itemCount = this.selectedCartItemArray.length;
    this.isCountAnimation = true;
  }

  /** 
   * Method for navigate to checkout page
   */
  navigateToCheckoutPage(){
    localStorage.setItem('selectedCartItemKey', JSON.stringify(this.selectedCartItemArray));
    localStorage.setItem('selectedCartItemCount',  this.itemCount.toString());
    this.route.navigateByUrl('/checkout');
  }

  /** 
   * Method for search product
   */
  filterByLetter(cartName: any){
    this.cartDetail = this.duplicateCartDetail;
    this.searchFilterArray=this.cartDetail.filter(x=>x.name.toLowerCase().includes(cartName.target.value.toLowerCase()));
    this.cartDetail = this.searchFilterArray;
  }

  /** 
   * Method for common filter functionality
   */
  filterProducts(){
    
  }
}
