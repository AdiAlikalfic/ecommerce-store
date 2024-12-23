import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }

  private cartItems: IProduct[] = [];

  private cartItemsSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([])

  getCartItems(): Observable<IProduct[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: IProduct) {
    const currentItems = this.cartItemsSubject.value;
    this.cartItems.push(product);
    this.cartItemsSubject.next([...currentItems, product]);
    
  }

  removeFromCart(productToRemove: IProduct): void {
    // const index = this.cartItems.findIndex(item => item.id === product.id)
    // if (index > -1) {
    //   this.cartItems.splice(index, 1);
    //   this.cartItemsSubject.next(this.cartItems);
    // }

    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(product => product.id !== productToRemove.id);
    this.cartItemsSubject.next(updatedCart)
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([])
  }
}
