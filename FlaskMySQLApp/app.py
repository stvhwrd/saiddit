from flask import Flask, render_template, json, request, redirect, session, jsonify
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from os import getenv
import sys  # for stderr

mysql = MySQL()
app = Flask(__name__)
app.secret_key = 'why would I tell you my secret key?'

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'csc370'
app.config['MYSQL_DATABASE_PASSWORD'] = 'project'
app.config['MYSQL_DATABASE_DB'] = 'saiddit'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


# handles / URL to go to the front page
@app.route('/')
def main():
    return render_template('index.html')


# handles /showSignUp URL to go to the signup page
@app.route('/showSignUp')
def showSignUp():
    return render_template('signup.html')

# handles /showLogIn URL to go to the login page
@app.route('/showLogIn')
def showLogIn():
    return render_template('login.html')


# handles /userHome URL to go to the users front page
@app.route('/userHome')
def userHome():
    return render_template('userHome.html')
    
    
# handles /subsaiddits URL to go to the unlogged in subsaiddit page
@app.route('/subsaiddits')
def subsaiddits():
    return render_template('subsaiddits.html')
    
    
# handles /logOut URL to log out of an account
@app.route('/logOut')
def logOut():
    session.pop('user',None)
    return redirect('/')


# handles /comments URL to go to the comments of a post
@app.route('/comments')
def comments():
    return render_template('comments.html')


# handles /userComments URL to go to the comments of a post
@app.route('/userComments')
def userComments():
    return render_template('userComments.html')


# handles /login URL to go to verify password and username, and go to the users front page
@app.route('/logIn', methods=['POST'])
def logIn():
    try:
        username = request.form['inputName']
        password = request.form['inputPassword']

        conn = mysql.connect()
        cursor = conn.cursor()

        # If we got the username and password
        if username and password:
            cursor.execute("SELECT password FROM Accounts WHERE username='"+username+"'")

            # MySQL adds 'u' to the front of the string to denote unicode and ',) to the end.
            password_hash = str(cursor.fetchone())[3:83]

            # check if password is correct else say that it was incorrect password or username
            if check_password_hash(password_hash, password):
                sys.stderr.write("correct username and password\n")
                session['user'] = username
                return json.dumps({'result': 'success', 'user': username})
            else:
                sys.stderr.write("Incorrect username or password\n")
                return json.dumps({'result': 'failed'})
    except Exception as e:
        sys.stderr.write(str(e)+"\n")
        return json.dumps({'error': str(e)})
    finally:
        cursor.close()
        conn.close()


# handles /signUp URL to check if a username has been claimed, if not creates a user from their username and password
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
            hashed_password = generate_password_hash(password, method="sha256", salt_length=8)
            insert_stmt = "INSERT INTO Accounts (username, password) VALUES (%s, %s)"
            data = (username, hashed_password)
            cursor.execute(insert_stmt, data)
            info = cursor.fetchone()

            if info is None:
                conn.commit()
                return json.dumps({'html': '<span>Enter the required fields</span>'})
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


# handles /getName URL to get the name of the active user (for database access/insertion purposes)
@app.route('/getName')
def getName():
    return  json.dumps({'result': 'success', 'name':session['user']})
    
# returns data fron the provided query
@app.route('/getQuery', methods=['POST', 'GET'])
def getComments():
    query = str(request.args.get('query'))
    
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(query)
    data = (cursor.fetchall())
    
    result = jsonify(data)
    return result    
        
        
# allows a user to comment and adds comment to database*
@app.route('/comment', methods=['POST','GET'])
def comment():
    try:
        text = request.form['comment']
        post_id = request.form['post_id']
        user_id = session['user']
        data = (text, post_id, user_id)
        
        conn = mysql.connect()
        cursor = conn.cursor()
        
        cursor.execute("INSERT INTO Comments (body, parent_post_id, commentor_id) VALUES (%s,%s,%s)", data)
        
        info = cursor.fetchone()
        if info is None:
            conn.commit()
            return json.dumps({'html': '<span>Enter the required fields</span>'})
        else:
            return json.dumps({'error': str(data[0])})
            
    except Exception as e:
        sys.stderr.write(str(e))
        return json.dumps({'error': str(e)})
    finally:
        cursor.close()
        conn.close() 

    
    
if __name__ == "__main__":
    app.run(host=getenv('IP', '0.0.0.0'), port=int(getenv('PORT', 8080)))
