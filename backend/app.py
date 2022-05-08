from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/upload", methods=['POST'])
@cross_origin()
def upload():
    image = request.args.get['picture']