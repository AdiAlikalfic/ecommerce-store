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
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(product => product.id !== productToRemove.id);
    this.cartItemsSubject.next(updatedCart)
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([])
  }

  updateCartItem(productToUpdate: IProduct) {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(product => {
      if (product.id === productToUpdate.id) {
        return {...product, quantity: productToUpdate.quantity}
      }
      return product
    });
    this.cartItemsSubject.next(updatedCart);
  }
}
