from flask import Flask, render_template, json, request
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from os import getenv
import sys  # for stderr

mysql = MySQL()
app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'csc370'
app.config['MYSQL_DATABASE_PASSWORD'] = 'project'
app.config['MYSQL_DATABASE_DB'] = 'saiddit'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')


@app.route('/showLogIn')
def showLogIn():
    return render_template('login.html')


@app.route('/signUp', methods=['POST', 'GET'])
def signUp():
    try:
        username = request.form['inputName']
        password = request.form['inputPassword']
        hashed_password = generate_password_hash(password, method="sha256", salt_length=8)

        conn = mysql.connect()
        cursor = conn.cursor()

        # validate the received values
        if username and password:
            insert_stmt = "INSERT INTO Accounts (username,password) VALUES (%s, %s)"
            data = (username, hashed_password)
            cursor.execute(insert_stmt, data)
            info = cursor.fetchone()

            if info is None:
                conn.commit()
                return json.dumps({'message': 'User created successfully !'})
            else:
                return json.dumps({'error': str(data[0])})
        else:
            return json.dumps({'html': '<span>Enter the required fields</span>'})

    except Exception as e:
        sys.stderr.write(str(e))
        return json.dumps({'error': str(e)})
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(host=getenv('IP', '0.0.0.0'), port=int(getenv('PORT', 8080)))
