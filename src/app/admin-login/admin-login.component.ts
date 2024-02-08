import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginAdmin(): void {
    this.http.post<any>('http://localhost:5000/api/admin/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          // Handle successful admin login
          console.log(response.message);
          // Redirect to admin dashboard
          this.router.navigate(['/admindashboard']);
        },
        error => {
          // Handle admin login error
          console.error('Error:', error.error.error);
        }
      );
  }
}
