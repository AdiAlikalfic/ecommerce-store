import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor() { }

  private favorites : IProduct[] = [];
  private favoritesSubject: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  getFavorites(): Observable<IProduct[]> {
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(product: IProduct) {
    const currentFavorites = this.favoritesSubject.value;
    if (!this.favorites.find(item => item.id === product.id)) {
      this.favorites.push(product);
      this.favoritesSubject.next([...currentFavorites, product])
    }
  }

  removeFromFavorites(product: IProduct) {
    const index = this.favorites.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.favorites.splice(index, 1);
      this.favoritesSubject.next(this.favorites);
    }
  }

  clearFavorites() {
    this.favorites = [];
    this.favoritesSubject.next([]);
  }
}
