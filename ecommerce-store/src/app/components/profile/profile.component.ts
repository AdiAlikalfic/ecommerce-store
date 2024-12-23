import { Component } from '@angular/core';
import { IUser } from '../../models/IUser';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getAllUsers().subscribe((users) => {
      this.user = users[0];
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
}
