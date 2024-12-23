import { Component, ViewChild } from '@angular/core';
import { IProduct } from '../../models/IProduct';
import { DataService } from '../../services/data.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CartServiceService } from '../../services/cart-service.service';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
products: IProduct[] = [];
selectedCategory: string = '';
searchTerm: string = '';
selectedProduct: any = null;
@ViewChild('productModal') productModal!: ProductModalComponent;

openModal(product: any) {
  this.selectedProduct = product;
  this.productModal.openModal()
}

constructor(private dataService: DataService, private cartService: CartServiceService, private favoriteService: FavouritesService) {}

ngOnInit() {
  this.dataService.displayAllProducts().subscribe({
    next: (data: IProduct[]) => {
      this.products = data;
    },
    error: (error) => {
      console.log(error);
      
    },
    complete: () => {
      console.log('complete');
      
    }
  })
}

getFilteredProducts() {
  return this.products.filter(product => {
    const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory
    const matchesSearch = !this.searchTerm || product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  })
}

selectCategory(category: string) {
  this.selectedCategory = category;
}

addToCart(product: IProduct){
  this.cartService.addToCart(product)
}

addToFavorites(product: IProduct) {
  this.favoriteService.addToFavorites(product);
}

}
