from flask import Flask, render_template, request
import requests

app = Flask(__name__)
api_key = "3872894b98dcca1b68c706330816f1b4"

@app.route('/', methods=['GET', 'POST'])
def index():
    weather_data = None
    error_message = None

    if request.method == 'POST':
        city_name = request.form['city']
        lat, lon = get_lat_lon(city_name, api_key)

        if lat is not None and lon is not None:
            weather_data, error_message = get_weather_data(lat, lon, api_key)
            print(weather_data)
        else:
            error_message = "Invalid city name"

    return render_template('index.html', weather_data=weather_data, error_message=error_message)

def get_weather_data(lat, lon, api_key):
    try:
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric'
        response = requests.get(url)
        data_list = response.json()

        if data_list and len(data_list) > 0:
            weather_data = response.json()
            return weather_data, None
        else:
            return None, f"Error fetching weather data. Status Code: {response.status_code}"
    except:
        return None, "Error in fetching data"

def get_lat_lon(city, api_key):
    try:
        resp = requests.get(f"http://api.openweathermap.org/geo/1.0/direct?q={city}&&appid={api_key}")
        
        if resp.status_code == 200:
            data_list = resp.json()

            if data_list and len(data_list) > 0:
                data = data_list[0]
                lat, lon = data.get("lat"), data.get("lon")
                return lat, lon
            else:
                return None, None
        else:
            return None, f"Error fetching data. Status Code: {resp.status_code}"
    except:
        return None, None

if __name__ == '__main__':
    app.run(debug=True)


