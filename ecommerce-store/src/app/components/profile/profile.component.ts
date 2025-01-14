import { Component } from '@angular/core';
import { IUser } from '../../models/IUser';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user : IUser = {
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: ''
    },
    id: 0,
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: ''
    },
    phone: ''
  }

  isEditable = false;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {

    this.authService.getUserProfile().subscribe((loggedInUser) => {
      if(loggedInUser) {
        const loggedInUserId = loggedInUser.id

        this.userService.getAllUsers().subscribe((users) => {
          const foundUser = users.find(u => u.id === loggedInUserId)
          if(foundUser) {
            this.user = foundUser
          } else {
            console.log('User not found');
          }
        })
      }
    })
    
  }

  enableEditing() {
    this.isEditable = true;
  }

  saveChanges() {
    this.userService.updateUserData(this.user).subscribe(
      (response: any) => {
        console.log('User data updated successfully', response);
        this.isEditable = false;
        
      },
      (error: any) => {
        console.error('Error updating user data', error)
      }
    )
  }

  logUserOut() {
    this.authService.logout()
  }
}
