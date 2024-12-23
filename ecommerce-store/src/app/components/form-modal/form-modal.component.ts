import { Component } from '@angular/core';
import { IUser } from '../../models/IUser';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  loginForm!: FormGroup;
  users: IUser[] = [];
  loginError: string | null = null;

  constructor(private fb:FormBuilder, private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.userService.getAllUsers().subscribe({
      next: (data: IUser[]) => {
        this.users = data
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {
        console.log(this.users);
      }
    })

  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
  

  onSubmit(): void {
    if(this.loginForm.invalid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    const user = this.users.find(user => user.email === email && user.password === password)

    if(user) {
      this.loginError = null;

      this.authService.login(user);

      console.log('Login successful');
      this.router.navigate(['/home'])
      
    } else {
      this.loginError = 'Invalid email or password';
    }
  }
}
