import os

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_mysqldb import MySQL

def create_app():
    app = Flask(__name__, static_url_path='', static_folder='../build')

    app.secret_key = os.urandom(24)
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  

    app.config['MYSQL_HOST'] = os.environ.get('DATABASE_HOST')
    app.config['MYSQL_USER'] = os.environ.get('DATABASE_USER')
    app.config['MYSQL_PASSWORD'] = os.environ.get('DATABASE_PASSWORD')
    app.config['MYSQL_DB'] = os.environ.get('DATABASE')

    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587  # Puerto del servidor de correo
    app.config['MAIL_USE_TLS'] = True  # Usar TLS para la conexión segura
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

    from . import db

    db.init_app(app)

    from . import api 

    app.register_blueprint(api.bp)

    CORS(app, origins=['http://localhost:5000'])
    JWTManager(app)
    mail = Mail(app)
    mysql = MySQL(app)

    @app.route('/Hola')
    def hola():
        return 'Chanchito Feliz'

    @app.after_request
    def add_no_cache_header(response):
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return response

    @app.errorhandler(404)
    def not_found(e):
        return send_from_directory(app.static_folder,'index.html')
    
    @app.route('/')
    def serve():
        return send_from_directory(app.static_folder,'index.html')

    return app
