import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userProfile = new BehaviorSubject<any>(null);

  constructor() { }

  login(user: IUser): void {
    this.loggedIn.next(true);
    this.userProfile.next(user);
  }

  logout(): void {
    this.loggedIn.next(false);
    this.userProfile.next(null);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserProfile() {
    return this.userProfile.asObservable();
  }
}
