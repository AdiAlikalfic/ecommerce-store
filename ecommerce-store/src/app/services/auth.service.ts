import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userProfile = new BehaviorSubject<IUser | null>(this.getStoredUserProfile());
  private users: IUser[] = []

  constructor() {
    const storedUser = this.getStoredUserProfile();
    if(storedUser) {
      this.loggedIn.next(true);
      this.userProfile.next(storedUser);
    }
  }

  private getStoredUserProfile(): IUser | null {
    const storedUser = localStorage.getItem('userProfile');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  login(user: IUser): void {
    this.loggedIn.next(true);
    this.userProfile.next(user);
    localStorage.setItem('userProfile', JSON.stringify(user));
  }

  logout(): void {
    this.loggedIn.next(false);
    this.userProfile.next(null);
    localStorage.removeItem('userProfile');
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserProfile() {
    return this.userProfile.asObservable();
  }

  registerUser(user: IUser) {
    this.users.push(user)
  }
}
