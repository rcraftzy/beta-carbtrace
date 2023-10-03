from flask import Flask, request, jsonify, send_from_directory
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_mail import Mail, Message
from dotenv import load_dotenv
import app
import os

load_dotenv()

# app = Flask(__name__)
app = Flask(__name__, static_url_path='', static_folder='build')
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'smoke'
app.config['MYSQL_DB'] = 'mydb'
app.secret_key = os.urandom(24)

# Configurar Flask-JWT
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  
jwt = JWTManager(app)

mysql = MySQL(app)

# Configurar la extensión Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587  # Puerto del servidor de correo
app.config['MAIL_USE_TLS'] = True  # Usar TLS para la conexión segura
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
mail = Mail(app)

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

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data['email']
    password = data['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM user WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()

    if user:
        # Generar el token de acceso y agregar el product_id como carga útil adicional
        access_token = create_access_token(identity=user[0])

        # Crear la respuesta
        response = jsonify(success=True, access_token=access_token)

        # Agregar los encabezados de control de caché
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Expires'] = '0'
        response.headers['Pragma'] = 'no-cache'

        return response

    return jsonify(success=False, message='Inicio de sesión fallido')

@app.route('/api/add-child', methods=['POST'])
@jwt_required()
def add_child():
    data = request.get_json()
    name = data['name']
    factor = data['factor']
    email = data['email']
    status = "Pending Request"
    viewed = "no"
    current_user = get_jwt_identity()

    cur = mysql.connection.cursor()
    # Obtener el email del usuario actual
    cur.execute("SELECT email FROM user WHERE id = %s", (current_user,))
    user_email = cur.fetchone()[0]
    # Insertar los datos del producto en la tabla "product" asociados al usuario
    cur.execute("INSERT INTO product (name, factor, provider_email, created_by) VALUES (%s, %s, %s, %s)",
                (name, factor, email, current_user))
    mysql.connection.commit()
    # Obtener el ID del producto recién insertado
    product_id = cur.lastrowid
    # Obtener el parent_id seleccionado desde la solicitud POST
    parent_id = data['parent_id']
    # Insertar el parent_id y el child_id en la tabla "child"
    cur.execute("INSERT INTO transaction (claimant_email, provider_email, product_id, status, viewed) VALUES (%s, %s, %s, %s, %s)"
                , (user_email, email, product_id, status, viewed))
    mysql.connection.commit()   

    cur.execute("INSERT INTO child (parent_id, child_id, factor) VALUES (%s, %s, %s)", (parent_id, product_id, factor))
    mysql.connection.commit()

    cur.close()

    sender = 'moises.alarcon7337@gmail.com'  # Tu dirección de correo electrónico
    receiver = email  # Dirección de correo electrónico del destinatario
    subject = 'Ayuda a tu cliente a saber su huella de carbono'
    body = f'''
    <html>
    <head>
        <style>
        /* Estilos personalizados */
        body {{
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
        }}
        .logo {{
            max-width: 200px;
        }}
        .cta-button {{
            display: inline-block;
            background-color: purple;
            color: black;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
        }}
        </style>
    </head>
    <body>
        <img src="./public/carbtrace.png" alt="Logo de tu empresa" class="logo">
        <h3>¡Ayuda a tus clientes a calcular su huella de carbono!</h3>
        <p>Estimado/a [Nombre del destinatario],</p>
        <p>Te invitamos a compartir los detalles del producto "{name}" con tus clientes para que puedan calcular su huella de carbono. Al calcular su huella, estarán tomando medidas para reducir su impacto ambiental y contribuir a un futuro sostenible.</p>
        <p>Por favor, haz clic en el siguiente botón para iniciar sesión en nuestra plataforma y seleccionar el producto relacionado:</p>
        <p><a href="http://beta.carbtrace/login?product_id={product_id}" class="cta-button">Iniciar sesión</a></p>
        <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
        <p>¡Gracias por tu colaboración y por ayudar a crear un mundo más verde y sostenible!</p>
        <p>Atentamente,</p>
        <p>Carbtrace</p>
    </body>
    </html>
    '''

    msg = Message(subject, sender=sender, recipients=[receiver])
    msg.html = body

    mail.send(msg)

    return jsonify(message='Agregado exitoso')

@app.route('/api/request', methods=['GET'])
@jwt_required()
def get_request():
    # Verificar si la sesión está activa
    current_user = get_jwt_identity()

    cur = mysql.connection.cursor()
    # Obtener el email del usuario actual
    cur.execute("SELECT email FROM user WHERE id = %s", (current_user,))
    user_email = cur.fetchone()[0]

    cur.execute("SELECT * FROM product WHERE provider_email = %s", (user_email,))
    requests = cur.fetchall()
    cur.close()

    # Crear una lista de productos
    request_list = []
    for request in requests:
        request_item = {
            'product_id': request[0],
            'name': request[1],
            'provider_email': request[2],
            'quantity': request[3],
            'status': request[11],
        }
        request_list.append(request_item)

    return jsonify(requests=request_list)

@app.route('/api/notification', methods=['GET'])
@jwt_required()
def get_notification():
    # Verificar si la sesión está activa
    current_user = get_jwt_identity()
    cur = mysql.connection.cursor()
    # Obtener el email del usuario actual
    cur.execute("SELECT email FROM user WHERE id = %s", (current_user,))
    user_email = cur.fetchone()[0]

    cur.execute("SELECT * FROM transaction WHERE provider_email = %s AND viewed = 'no' ORDER BY product_id DESC", (user_email,))
    requests = cur.fetchall()
    cur.close()

    # Crear una lista de productos
    request_list = []
    for request in requests:
        request_item = {
            'id': request[0],
            'claimant_email': request[1],
            'provider_email': request[2],
            'name': request[4],
            'quantity': request[5],
            'viewed': request[6],
        }
        request_list.append(request_item)

    return jsonify(requests=request_list)

@app.route('/api/notification/mark-all-as-read', methods=['PUT'])
@jwt_required()
def mark_all_as_read():
    try:
        # Verificar si la sesión está activa
        current_user = get_jwt_identity()
        cur = mysql.connection.cursor()

        # Obtener el email del usuario actual
        cur.execute("SELECT email FROM user WHERE id = %s", (current_user,))
        user_email = cur.fetchone()[0]

        # Actualizar el estado 'viewed' en la base de datos
        cur.execute("UPDATE transaction SET viewed = 'si' WHERE provider_email = %s AND viewed = 'no'", (user_email,))
        mysql.connection.commit()

        cur.close()

        return jsonify(message='Solicitudes actualizadas correctamente'), 200

    except Exception as e:
        return jsonify(message='Error al actualizar las solicitudes', error=str(e)), 500

@app.route('/api/update_factor', methods=['PUT'])
@jwt_required()
def update_factor():
    data = request.get_json()
    current_user = get_jwt_identity()
    product = data['product']
    total_emission = data['totalMaterialEmission']
    materials_data = data['materialData']
    distance_results = data['distanceResults']
    material_results = data['materialResults']
    quantity_results = data['quantityResults']
    status = "Shared"

    cur = mysql.connection.cursor()
    try:        
        cur.execute("UPDATE product SET status = %s WHERE id = %s",
                (status, product))
        mysql.connection.commit()
                
        if len(materials_data) != len(distance_results) or len(materials_data) != len(material_results) or len(materials_data) != len(quantity_results):
            return jsonify(message='La longitud de materialData, distanceResults y materialResults debe ser la misma'), 400
        
        child_ids = []
        child_emissions = []

        for i in range(len(materials_data)):
            material_data = materials_data[i]
            material_name = material_data['materialName']
            email = material_data['email']
            distance_result = distance_results[i]
            quantity_result = quantity_results[i]
            material_result = material_results[i]

            cur.execute("INSERT INTO product (name, provider_email, quantity, transport_emission, product_emission, created_by) VALUES (%s, %s, %s, %s, %s, %s)",
                        (material_name, email, quantity_result, distance_result, material_result, current_user))

            child_ids.append(cur.lastrowid)
            child_emissions.append(material_result)
   
            print(f"Received data - Material Name: {material_name}, Email: {email}, Distance Result: {distance_result}, Material Result: {material_result}, Current User: {current_user}")

        mysql.connection.commit()
        
        for child_id, child_emission in zip(child_ids, child_emissions):
            cur.execute("INSERT INTO child (parent_id, child_id, child_emission) VALUES (%s, %s, %s)", (product, child_id, child_emission))
        mysql.connection.commit()

        cur.execute("UPDATE product SET product_emission = %s WHERE id = %s",
                    (total_emission, product))
        mysql.connection.commit()

        cur.execute("UPDATE child SET child_emission = %s WHERE child_id = %s",
                (total_emission, product))
        mysql.connection.commit()

        cur.close()
        return jsonify(message='Agregado exitoso')
    except Exception as e:
        print("Error:", e)
        return jsonify(message='Error'), 500
    
@app.route('/api/update_result', methods=['PUT'])
@jwt_required()
def update_result():
    data = request.get_json()
    current_user = get_jwt_identity()
    product = data['product']
    result = data['result']
    status = "Shared"

    cur = mysql.connection.cursor()
    try:        
        cur.execute("UPDATE product SET status = %s WHERE id = %s",
                (status, product))
        mysql.connection.commit()

        cur.execute("UPDATE product SET product_emission = %s WHERE id = %s",
                    (result, product))
        mysql.connection.commit()

        cur.execute("UPDATE child SET child_emission = %s WHERE child_id = %s",
                (result, product))
        mysql.connection.commit()

        cur.close()
        return jsonify(message='Agregado exitoso')
    except Exception as e:
        print("Error:", e)
        return jsonify(message='Error'), 500

@app.route('/api/update_calculator_factor', methods=['PUT'])
def update_calculator_factor():
    data = request.get_json()
    current_user = "none"
    product = data['product']
    total_emission = data['totalMaterialEmission']
    materials_data = data['materialData']
    distance_results = data['distanceResults']
    material_results = data['materialResults']
    quantity_results = data['quantityResults']
    status = "Shared"

    cur = mysql.connection.cursor()
    try:        
        cur.execute("UPDATE product SET status = %s WHERE id = %s",
                (status, product))
        mysql.connection.commit()
                
        if len(materials_data) != len(distance_results) or len(materials_data) != len(material_results) or len(materials_data) != len(quantity_results):
            return jsonify(message='La longitud de materialData, distanceResults y materialResults debe ser la misma'), 400
        
        child_ids = []
        child_emissions = []

        for i in range(len(materials_data)):
            material_data = materials_data[i]
            material_name = material_data['materialName']
            email = material_data['email']
            distance_result = distance_results[i]
            quantity_result = quantity_results[i]
            material_result = material_results[i]

            cur.execute("INSERT INTO product (name, provider_email, quantity, transport_emission, product_emission, created_by) VALUES (%s, %s, %s, %s, %s, %s)",
                        (material_name, email, quantity_result, distance_result, material_result, current_user))

            child_ids.append(cur.lastrowid)
            child_emissions.append(material_result)
   
            print(f"Received data - Material Name: {material_name}, Email: {email}, Distance Result: {distance_result}, Material Result: {material_result}, Current User: {current_user}")

        mysql.connection.commit()
        
        cur.execute("UPDATE product SET product_emission = %s WHERE id = %s",
                    (total_emission, product))
        mysql.connection.commit()

        cur.execute("UPDATE child SET child_emission = %s WHERE child_id = %s",
                (total_emission, product))
        mysql.connection.commit()

        cur.close()
        return jsonify(message='Agregado exitoso')
    except Exception as e:
        print("Error:", e)
        return jsonify(message='Error'), 500

@app.route('/api/user', methods=['GET'])
@jwt_required()
def get_user_data():
    current_user = get_jwt_identity()

    cur = mysql.connection.cursor()
    cur.execute("SELECT username, email FROM user WHERE id = %s", (current_user,))
    user_data = cur.fetchone()
    cur.close()

    if user_data:
        username, email = user_data
        return jsonify(username=username, email=email)

    return jsonify(success=False, message='Usuario no encontrado')

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data['username']
    email = data['email']
    password = data['password']
    company_name = data['company_name']

    # Insertar el nombre de la empresa en la tabla "company"
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO company (name) VALUES (%s)", (company_name,))
    company_id = cur.lastrowid
    mysql.connection.commit()

    # Insertar los datos del usuario en la tabla "user"
    cur.execute("INSERT INTO user (username, email, password, company_id) VALUES (%s, %s, %s, %s)",
                (username, email, password, company_id))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Registro exitoso')
     
@app.route('/api/newmaterial', methods=['POST'])
@jwt_required()
def newmaterial():
    data = request.get_json()

    name = data['name']
    quantity = data['productQuantity']
    scope1 = data['scope1Emission']
    scope2 = data['scope2Emission']
    waste = data['waste']
    materials_data = data['materialData']
    distance_results = data['distanceResults']
    material_results = data['materialResults']
    quantity_results = data['quantityResults']
    status = "Pending Request"
    viewed = "no"
    current_user = get_jwt_identity()

    cur = mysql.connection.cursor()
    try:
        cur.execute("SELECT email FROM user WHERE id = %s", (current_user,))
        user_email = cur.fetchone()[0]

        cur.execute("INSERT INTO product (name, quantity, scope1_emission, scope2_emission, waste_emission, created_by) VALUES (%s, %s, %s, %s, %s, %s)",
            (name, quantity, scope1, scope2, waste, current_user))
        
        parent_id = cur.lastrowid
                
        if len(materials_data) != len(distance_results) or len(materials_data) != len(material_results) or len(materials_data) != len(quantity_results):
            return jsonify(message='La longitud de materialData, distanceResults y materialResults debe ser la misma'), 400
        
        child_ids = []
        child_emissions = []
        child_emails = []
        child_quantitys = []
        child_names = []

        for i in range(len(materials_data)):
            material_data = materials_data[i]
            material_name = material_data['materialName']
            email = material_data['email']
            distance_result = distance_results[i]
            quantity_result = quantity_results[i]
            material_result = material_results[i]

            cur.execute("INSERT INTO product (name, provider_email, quantity, transport_emission, product_emission, created_by, status) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                        (material_name, email, quantity_result, distance_result, material_result, current_user, status))
            # Add this line to inspect the received data
            child_ids.append(cur.lastrowid)
            child_emissions.append(material_result)
            child_emails.append(email)
            child_quantitys.append(quantity_result)
            child_names.append(material_name)

            sender = 'moises.alarcon7337@gmail.com'  # Tu dirección de correo electrónico
            receiver = email  # Dirección de correo electrónico del destinatario
            subject = 'Ayuda a tu cliente a saber su huella de carbono'

            base_url = "http://beta.carbtrace/calculator"
            query_params = f"?child_id={child_ids[i]}"  # Add any other query parameters if needed
            login_url = f"{base_url}{query_params}"
            body = f'''
            <html>
            <head>
                <style>
                /* Estilos personalizados */
                body {{
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    line-height: 1.5;
                }}
                .logo {{
                    max-width: 200px;
                }}
                .cta-button {{
                    display: inline-block;
                    background-color: purple;
                    color: black;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 4px;
                }}
                </style>
            </head>
            <body>
                <img src="./public/carbtrace.png" alt="Logo de tu empresa" class="logo">
                <h3>¡Ayuda a tus clientes a calcular su huella de carbono!</h3>
                <p>Estimado/a [Nombre del destinatario],</p>
                <p>Te invitamos a compartir los detalles del producto "{material_name}" con la respectiva cantidad "{quantity_result}" con tus clientes para que puedan calcular su huella de carbono. Al calcular su huella, estarán tomando medidas para reducir su impacto ambiental y contribuir a un futuro sostenible.</p>
                <p>Por favor, haz clic en el siguiente botón para iniciar sesión en nuestra plataforma y seleccionar el producto relacionado:</p>
                <p><a href="{login_url}" class="cta-button">Share Information</a></p>
                <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                <p>¡Gracias por tu colaboración y por ayudar a crear un mundo más verde y sostenible!</p>
                <p>Atentamente,</p>
                <p>Carbtrace</p>
            </body>
            </html>
            '''

            msg = Message(subject, sender=sender, recipients=[receiver])
            msg.html = body

            mail.send(msg)
        mysql.connection.commit()
        
        for child_id, child_emission in zip(child_ids, child_emissions):
            cur.execute("INSERT INTO child (parent_id, child_id, child_emission) VALUES (%s, %s, %s)", (parent_id, child_id, child_emission))
        mysql.connection.commit()

        for child_id, child_email, child_quantity, child_name in zip(child_ids, child_emails, child_quantitys, child_names):
            cur.execute("INSERT INTO transaction (claimant_email, provider_email, product_id, quantity, name, viewed) VALUES (%s, %s, %s, %s, %s, %s)", (user_email, child_email, child_id, child_quantity, child_name, viewed))
        mysql.connection.commit()

        cur.close()

        return jsonify(message='Agregado exitoso')
    except Exception as e:
        print("Error:", e)
        return jsonify(message='Error'), 500

@app.route('/api/my-supplier', methods=['GET'])
@jwt_required() 
def get_my_supplier():
    current_user = get_jwt_identity()  # Obtener el ID del usuario del token JWT

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM product WHERE created_by = %s AND provider_email != ''", (current_user,))
    suppliers = cur.fetchall()
    cur.close()

    # Crear una lista de productos
    supplier_list = []
    for supplier in suppliers:
        supplier_item = {
            'id': supplier[0],
            'name': supplier[1],
            'factor': supplier[2],
            'email': supplier[3]
        }
        supplier_list.append(supplier_item)

    return jsonify(suppliers=supplier_list)

@app.route('/api/my-products', methods=['GET'])
@jwt_required() 
def get_my_products():
    current_user = get_jwt_identity() 

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM product WHERE created_by = %s AND (provider_email = '' OR provider_email IS NULL)", (current_user,))
    products = cur.fetchall()

    product_list = []
    for product in products:
        product_id = product[0]
        product_name = product[1]
        product_quantity = product[3]

        cur.execute("SELECT SUM(p.transport_emission) FROM product p JOIN child c ON p.id = c.child_id WHERE c.parent_id = %s", (product_id,))
        sum_transport_emission = cur.fetchone()[0]
        # Calcular la suma de los factores de los childs del producto principal
        cur.execute("SELECT SUM(child_emission) FROM child WHERE parent_id = %s", (product_id,))
        sum_emission = cur.fetchone()[0]

        cur.execute("SELECT scope1_emission + scope2_emission + waste_emission FROM product WHERE id = %s", (product_id,))
        sum_scope1_emission = cur.fetchone()[0]

        # Si la suma es None (ningún child), asignar factor 0; de lo contrario, asignar la suma calculada
        transport_emission = 0 if sum_transport_emission is None else sum_transport_emission
        child_emission = 0 if sum_emission is None else sum_emission
        scope1_emission = 0 if sum_scope1_emission is None else sum_scope1_emission

        if product_quantity is None:
           product_quantity = 1

        factor = (transport_emission + child_emission + scope1_emission) / product_quantity

        product_item = {
            'id': product_id,
            'name': product_name,
            'quantity': product_quantity,
            'emission' : child_emission,
            'factor' : factor,
        }
        product_list.append(product_item)

    cur.close()

    return jsonify(products=product_list)

@app.route('/api/update-emissions', methods=['POST'])
@jwt_required()
def update_emissions():
    data = request.get_json()

    scope = data['selectedCountry']
    category = data['selectedState']
    subcategory = data['selectedCity']
    tipo = data['selectedLevel2']
    unit = data['selectedLevel3']
    value = float(data['result'])
    current_user = get_jwt_identity()

    # Realizar la actualización en la base de datos según la categoría seleccionada
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO emissions (uploaded_by, scope, category, subcategory, type, unit, value) VALUES (%s,%s, %s,%s, %s,%s, %s)",
                 (current_user, scope, category, subcategory, tipo, unit, value))
    mysql.connection.commit()
    cur.close()

    return jsonify(message='Datos actualizados exitosamente')

@app.route('/api/get-emissions', methods=['GET'])
@jwt_required()
def get_emissions_data():
    current_user = get_jwt_identity()

    cur = mysql.connection.cursor()
    cur.execute("SELECT SUM(value) FROM emissions WHERE uploaded_by = %s", (current_user,))
    total_emissions = cur.fetchone()[0]

    cur.execute("SELECT SUM(value) FROM emissions WHERE uploaded_by = %s AND scope = 'Scope 1'", (current_user,))
    total_emissions_scope1 = cur.fetchone()[0]

    cur.execute("SELECT SUM(value) FROM emissions WHERE uploaded_by = %s AND scope = 'Scope 2'", (current_user,))
    total_emissions_scope2 = cur.fetchone()[0]

    cur.execute("SELECT SUM(value) FROM emissions WHERE uploaded_by = %s AND (scope != 'Scope 1' AND scope != 'Scope 2')", (current_user,))
    total_emissions_scope3 = cur.fetchone()[0]

    cur.close()

    if total_emissions_scope1 is not None and total_emissions_scope2 is not None and total_emissions_scope3 is not None and total_emissions is not None:
        return jsonify(total_emissions_scope1=total_emissions_scope1, total_emissions_scope2=total_emissions_scope2, total_emissions_scope3=total_emissions_scope3, total_emissions=total_emissions)

    return jsonify(success=False, message='Emissiones no encontradas')

@app.route('/api/table-emissions', methods=['GET'])
@jwt_required() 
def table_emissions():
    current_user = get_jwt_identity() 

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM emissions WHERE uploaded_by = %s", (current_user,))
    emissions = cur.fetchall()
    cur.close()

    # Crear una lista de product
    emission_list = []
    for emission in emissions:
        emission_item = {
            'id': emission[0],
            'scope': emission[1],
            'category': emission[2],
            'subcategory': emission[3],
            'type': emission[4],
            'unit': emission[5],
            'value': emission[6],
        }
        emission_list.append(emission_item)

    return jsonify(emissions=emission_list)

if __name__ == '__main__':
    app.run()
