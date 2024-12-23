import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>('https://fakestoreapi.com/users')
  }

  updateUserData(user: any): Observable<any> {
    return this.httpClient.put<any>(`https://fakestoreapi.com/users/${user.id}`, user)
  }
}
