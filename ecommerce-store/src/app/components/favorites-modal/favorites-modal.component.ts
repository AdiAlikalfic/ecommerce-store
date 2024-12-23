import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrl: './favorites-modal.component.css'
})
export class FavoritesModalComponent {
  @Input() products: IProduct[] = [];
  @Output() close = new EventEmitter<void>();
  totalPrice = 0;
  private favoriteItemSubscription: any;
  constructor(private favoritesService: FavouritesService) {}

  ngOnInit(): void {
    this.calculateTotalPrice();

    this.favoriteItemSubscription = this.favoritesService.getFavorites().subscribe(items => {
      this.products = items;
      this.calculateTotalPrice();
    })
  }

  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((sum, product) => sum + product.price, 0)
  }

  closeModal() {
    this.close.emit()
  }

  removeFromFavorites(product: IProduct) {
    this.favoritesService.removeFromFavorites(product);
  }

  clearFavorites() {
    this.favoritesService.clearFavorites();
    this.close.emit();
  }
}
