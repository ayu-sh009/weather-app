import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface WeatherInfo {
  city: string;
  temperature: number;
  description: string;
}

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent {
  cityName: string = '';
  weatherInfo: WeatherInfo | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  searchWeather(): void {
    this.http.get<any>(`http://localhost:5000/weather?city=${this.cityName}`)
      .subscribe({
        next: (response) => {
          this.weatherInfo = {
            city: response.name,
            temperature: response.main.temp,
            description: response.weather[0].description
          };
          this.errorMessage = null;
        },
        error: (error) => {
          this.weatherInfo = null;
          this.errorMessage = 'Error fetching weather information. Please try again.';
          console.error('Error:', error);
        }
      });
  }
}
