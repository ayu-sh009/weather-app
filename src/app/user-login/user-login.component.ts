import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(): void {
    this.http.post<any>('http://localhost:5000/api/user/login', { username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          // Handle successful login
          console.log(response.message);
          // Redirect to weather search page
          this.router.navigate(['/weather-search']);
        },
        error: (error) => {
          // Handle login error
          console.error('Error:', error.error.error);
        }
      });
  }
}
