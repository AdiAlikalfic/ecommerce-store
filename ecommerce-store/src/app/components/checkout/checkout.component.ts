import { ChangeDetectorRef, Component } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartItems: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private cartServcie: CartServiceService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartServcie.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    })
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, product) => {
      const price = Number(product.price)
      const quantity = isNaN(Number(product.quantity)) ? 1 : Number(product.quantity);

      if(isNaN(price) || isNaN(quantity)) {
        console.error('Invalid data: ', product)
        return sum
      }
      return sum + (price * quantity)
    }, 0);
    console.log(this.totalPrice);
  }

  onQuantityChange(product: IProduct) {
    if (product.quantity === 0) {
      this.removeProduct(product)
    } else {
      this.updateCartItem(product)
    }
  }

  removeProduct(product: IProduct) {
    this.cartServcie.removeFromCart(product);
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.calculateTotalPrice()
  }

  increaseQuantity(product: IProduct) {
    product.quantity += 1;
    this.updateCartItem(product);
  }

  decreaseQuantity(product: IProduct) {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.updateCartItem(product);
    }
  }

  updateCartItem(product: IProduct) {
    this.cartServcie.updateCartItem(product);
    this.calculateTotalPrice();
  }


  
}
