from flask import render_template, request, jsonify, Flask
from datetime import datetime

app = Flask(__name__)
items = []


def smartinsert(input):
    global items
    for i in range(len(items)):
        if items[i]["exp"] > input["exp"]:
            items.insert(i, input)
            return
    items.append(input)


@app.route("/delete/<food_id>", methods=["POST"])
def delete(food_id):
    items.pop(int(food_id))
    return render_template("index.html", items=items)


@app.route("/edit/<food_id>", methods=["POST"])
def update(food_id):
    now = datetime.now()
    data = request.get_json()
    if data["food"]:
        items[int(food_id)]["food"] = data["food"]
    if data["exp"]:
        item = items.pop(int(food_id))
        item["exp"] = data["exp"]
        exp = datetime.strptime(data["exp"], "%Y-%m-%d").date()
        item["status"] = (exp - now.date()).days
        smartinsert(item)
    return render_template("index.html", items=items)


@app.route("/create", methods=["POST"])
def create():
    """recieves post requests to add new food"""
    now = datetime.now()
    data = request.get_json()
    if len(data) == 2 and data["food"] and data["exp"]:
        exp = datetime.strptime(data["exp"], "%Y-%m-%d").date()
        delta = exp - now.date()
        smartinsert({"food": data["food"], "exp": data["exp"], "status": delta.days})
        return render_template("index.html", items=items)
    return render_template("index.html", items=items)


@app.route("/")
def homepage():
    """returns rendered homepage"""
    return render_template("index.html", items=items)


if __name__ == "__main__":
    app.run(debug=True)
