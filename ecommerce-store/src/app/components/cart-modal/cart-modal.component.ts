import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {
  @Input() products: IProduct[] = [];
  @Output() close = new EventEmitter<void>()
  totalPrice: number = 0;
  private cartItemsSubscription: any;

  constructor(private cartService: CartServiceService){}

  ngOnInit(): void {
    this.calculateTotalPrice();

    this.cartItemsSubscription = this.cartService.getCartItems().subscribe(items => {
      this.products = items;
      this.calculateTotalPrice();
    })
  }

  ngOnDestroy(): void {
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe()
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((sum, product) => sum + product.price, 0);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.close.emit();
  }

  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product)
  }
  
  closeModal() {
    this.close.emit()
  }
}
