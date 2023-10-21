from flask import Flask, render_template, Response, request, redirect, url_for, json
import numpy as np
import pandas as pd

app = Flask(__name__)
app.secret_key = "alji212304"

@app.route("/")
def home():
    return render_template("main.html")

@app.route('/', methods = ['POST'])
def test():
    print('test')
    return render_template('main.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
