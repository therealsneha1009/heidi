from flask import Flask, request, jsonify
import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/hello")
def hello_sneha():
    return "<p>Hello, Sneha!</p>"

@app.route("/message/<m>")
def msg(m):
    return "<p>m<p>"

@app.route('/upload', methods = ['POST'])
def upload_file():
    try:
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                return 'No file part'
            file = request.files['file']
            # if user does not select file, browser also
            # submit a empty part without filename
            if file.filename == '':
                return 'No selected file'
            if file and file.filename:
                filename = file.filename
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return 'Success'
    except:
        return "Invalid Request"

# @app.route("/api/upload", methods=['POST'])
# @cross_origin()
# def upload():
#     image = request.args.get['picture']

# print("Hello World")