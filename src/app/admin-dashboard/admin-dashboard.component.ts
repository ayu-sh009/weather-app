import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

interface WeatherHistory {
  id: number;
  city: string;
  temperature: number;
  description: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  weatherHistory: WeatherHistory[] = [];
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/admin')
      .subscribe({
        next: (response) => {
          this.weatherHistory = response.recent_weather_history;
        },
        error: (error) => {
          console.error('Error:', error.error.error);
        }
      });
  }

  deleteWeather(weatherId: number): void {
    this.http.delete<any>(`http://localhost:5000/delete/${weatherId}`)
      .subscribe(
        response => {
          console.log(response.message);
          // Reload the current route
          window.location.reload();
        },
        error => {
          console.error('Error:', error.error.error);
        }
      );
  }
  
}