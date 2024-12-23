import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartServiceService } from '../../services/cart-service.service';
import { FavouritesService } from '../../services/favourites.service';
import { IProduct } from '../../models/IProduct';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
cartItemCount: number = 0;
favoritesItemCount: number = 0;
cartItems: IProduct[] = [];
favoriteItems: IProduct[] = [];
isCartModalOpen: boolean = false;
isFavoritesModalOpen: boolean = false;
isLoggedin: boolean = false;
userProfile: any = null

constructor(private cartService: CartServiceService, private favoriteService: FavouritesService, private authService: AuthService, private router: Router) {}


ngOnInit(): void {
  this.authService.isLoggedIn().subscribe((status) => {
    this.isLoggedin = status;
  });

  this.authService.getUserProfile().subscribe((profile) => {
    this.userProfile = profile;
    console.log('User Profile:', this.userProfile);
  })


  this.cartService.getCartItems().subscribe(items => {
    this.cartItemCount = items.length;
    this.cartItems = items;
  });

  this.favoriteService.getFavorites().subscribe(items => {
    this.favoritesItemCount = items.length;
    this.favoriteItems = items;
  });
}

openCartModal() {
  this.isCartModalOpen = true;
}

openFavoritesModal() {
  this.isFavoritesModalOpen = true;
}

closeModal() {
  this.isCartModalOpen = false;
  this.isFavoritesModalOpen = false;
}

onSignOutClick() {
  this.authService.logout();
  this.router.navigate(['/login'])
}

}
