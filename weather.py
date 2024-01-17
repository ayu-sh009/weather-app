from flask import Flask, request, jsonify, g
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import requests


app = Flask(__name__)
CORS(app)  
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

api_key = "3872894b98dcca1b68c706330816f1b4"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"User('{self.username}' and {self.password})"
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"Admin('{self.username}' and {self.password})"
class WeatherInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    temperature = db.Column(db.Float)
    description = db.Column(db.String(255))

    def __repr__(self):
        return f"WeatherInfo(City: {self.city}, Temperature: {self.temperature}, Description: {self.description})"


@app.route('/api/user/login', methods=['POST'])
def login_user():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/admin/login', methods=['POST'])
def login_admin():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    admin = Admin.query.filter_by(username=username, password=password).first()

    if admin:
        return jsonify({'message': 'Admin login successful'})
    else:
        return jsonify({'error': 'Invalid admin username or password'}), 401
#
# def index():
#     return "Hello, this is the Flask backend!"

@app.route('/weather', methods=['GET'])
def get_weather():
    city_name = request.args.get('city')
    lat, lon = get_lat_lon(city_name, api_key)

    if lat is not None and lon is not None:
        weather_data, error_message = get_weather_data(lat, lon, api_key)

        if weather_data:
            weather_info = WeatherInfo(
                city=city_name,
                temperature=weather_data['main']['temp'],
                description=weather_data['weather'][0]['description']
            )
            db.session.add(weather_info)
            db.session.commit()

            return jsonify(weather_data)
        else:
            return jsonify({'error': {'message': error_message}})
    else:
        return jsonify({'error': {'message': 'Invalid city name'}})

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
@app.route("/admin-dashboard",methods=['GET'])
def admin_dashboard():
    # Get recent weather history for all users
    recent_weather_history = WeatherInfo.query.order_by(WeatherInfo.id.desc()).limit(10).all()

    # Extract relevant information for display
    formatted_history = []
    for weather_info in recent_weather_history:
        formatted_history.append({
            'city': weather_info.city,
            'temperature': weather_info.temperature,
            'description': weather_info.description,
        })

    return jsonify({'recent_weather_history': formatted_history})
if __name__ == '__main__':
    app.run(debug=True)

