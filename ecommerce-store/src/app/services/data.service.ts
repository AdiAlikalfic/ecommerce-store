import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  displayAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>("https://fakestoreapi.com/products")
  }
}
