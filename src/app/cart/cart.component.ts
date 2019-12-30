import { Component, OnInit } from '@angular/core';
import data from '../cart.json';
import { cartModel } from './cart.model.js';

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

  constructor() { 
    this.cartDetail = [];
  }

  ngOnInit() {
    this.cartDetail=data;
    this.duplicateCartDetail = this.cartDetail;
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
      if(price < 500){
        this.cartDetail = this.cartDetail.filter(x => x.price <= price); 
      }     
      else if(price >= 500 && price< 999){
        this.cartDetail = this.cartDetail.filter(x => x.price >= price); 
      }
      else if(price >= 1000 && price< 1500){
        this.cartDetail = this.cartDetail.filter(x => x.price >= price); 
      }
      else if(price >= 1500 && price< 2000){
        this.cartDetail = this.cartDetail.filter(x => x.price >= price); 
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
  addCartItem(){
  }
}
