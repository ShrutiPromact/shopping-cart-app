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
  categoryFilter: string;
  priceFilterString: string;
  isExample: boolean;
  cartName: string;

  constructor(public route: Router) { 
    this.cartDetail = [];    
  }

  ngOnInit() {
    this.cartDetail=data;
    this.duplicateCartDetail = this.cartDetail;
    this.selectedCartItemArray = JSON.parse(localStorage.getItem('selectedCartItemKey'));
    this.itemCount = parseInt(localStorage.getItem('selectedCartItemCount'));
    if(this.itemCount===0){
      this.isExample = true;
    }else{
      this.isExample=false;
    }
  }

  /** 
   * Method for add to cart button
   */
  addCartItem(itemDetail: cartModel){
    this.selectedCartItemArray.push(itemDetail);
    this.itemCount = this.selectedCartItemArray.length;
    this.isCountAnimation = true;
    this.isExample=false;
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
    this.cartDetail = this.duplicateCartDetail;

    if(this.categoryFilter==='men'||this.categoryFilter==='women'||this.categoryFilter==='kid'){
      this.cartDetail=this.cartDetail.filter(x=>(x.category==='men' && this.categoryFilter==='men')
      ||(x.category==='women' && this.categoryFilter==='women')
      ||(x.category==='kid' && this.categoryFilter==='kid'));
    }  
    
    if(this.priceFilterString ==='499'|| this.priceFilterString ==='999'|| this.priceFilterString ==='1499'|| this.priceFilterString ==='2000'){
      this.cartDetail = this.cartDetail.filter(x => (x.price <= 499 && this.priceFilterString==='499') || (x.price <= 999 && this.priceFilterString==='999')
      ||(x.price <= 1499 && this.priceFilterString==='1499')|| (x.price <= 2000 && this.priceFilterString==='2000'));
    }

    if(this.colorFilter.Red||this.colorFilter.Blue){
      this.cartDetail = this.cartDetail.filter(x => (x.color === 'Red' && this.colorFilter.Red) || (x.color === 'Blue' && this.colorFilter.Blue));
    }

    if(this.cartName!=="" && this.cartName!==null&&this.cartName!==undefined){
      this.cartDetail = this.cartDetail.filter(x=>x.name.toLowerCase().includes(this.cartName.toLowerCase()));
    }
  }

  /** 
   * Method for clearing all filter 
   */
  clearAllFilter(){
    if(this.cartName ===""){
      this.cartDetail = this.duplicateCartDetail;
      this.colorFilter = { Red: false, Blue: false };
      this.priceFilterString = "";
      this.categoryFilter = "";
    } 
    else{
      this.cartDetail = this.duplicateCartDetail.filter(x=>x.name.toLowerCase().includes(this.cartName.toLowerCase()));
      this.colorFilter = { Red: false, Blue: false };
      this.priceFilterString = "";
      this.categoryFilter = "";
    } 
  }
}
