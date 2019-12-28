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
    if(price < 500){
      this.cartDetail = this.cartDetail.filter(x => x.price <= price); 
    }     
       if(price >= 500){
        this.cartDetail = this.cartDetail.filter(x => x.price >= price); 
       }
  }

  /** 
   * Method for select Color
   */
  selectColor(color: string, isChecked){
    if(isChecked.checked){
      this.cartDetail = this.cartDetail.filter(y => y.color === color);
    }
  }
}
