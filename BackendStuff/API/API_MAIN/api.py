from flask import Flask, request, make_response, abort, jsonify, send_from_directory
import sys
from helper import DBAPI
from hashlib import sha3_512
from datetime import datetime
import binascii

app = Flask(__name__)
db_handler = DBAPI("localhost", "root", "root", "TicketDB")
@app.route('/', methods=['GET'])
def home():
    return "<h1>Bababoyee</h1>"

@app.route("/ticket/availableTickets", methods=["GET"])
def get_tickets():
    date = request.args.get("date")
    tickets = db_handler.get_tickets_by_date(date)
    return jsonify({"available_tickets": "%s" % tickets}), 200

@app.route('/ticket/bookTicket', methods=["POST"])
def book_ticket():
    keys = ["email", "name", "date", "publicKey"]
    json_data = request.json

    if not json_data:
        abort(400)
    for key in keys:
        if key not in json_data:
            abort(400)
    emailHash = sha3_512(json_data[keys[0]].encode("utf-8")).hexdigest()
    nameHash = sha3_512(json_data[keys[1]].encode("utf-8")).hexdigest()
    date = json_data[keys[2]]
    publicKey = json_data[keys[3]]
    tickets = db_handler.get_tickets_by_date(date)
    if tickets <= 0:
        # no more tickets left
        return jsonify({"bookedTicketID": -1}), 200

    db_handler.update_tickets_by_date(tickets-1, date)
    id = db_handler.insert_booked_ticket(publicKey, emailHash, nameHash, date)
    if id:
        return jsonify({"bookedTicketID": id}), 200
    abort(501)

@app.route('/ticket/publicKey', methods=["POST"])
def get_publicKey():
    keys = ["date", "email", "name", "ticketId"]

    json_data = request.json
    if not json_data:
        abort(400)

    for key in keys:
        if key not in json_data:
            abort(400)
    emailHash = sha3_512(json_data[keys[1]].encode("utf-8")).hexdigest()
    nameHash = sha3_512(json_data[keys[2]].encode("utf-8")).hexdigest()
    date = json_data[keys[0]]
    ticketId = json_data[keys[3]]
    publicKey = db_handler.query_all(nameHash, emailHash, date, ticketId)[0][1]
    return jsonify({"publicKey": publicKey}), 200

@app.route("/ticket/valid", methods=["POST"])
def valid_ticket():
    keys = ["ticketId", "name", "email", "date", "valid"]

    json_data = request.json

    if not json_data:
        abort(400)
    
    for key in keys:
        if key not in json_data:
            abort(400)
    emailHash = sha3_512(json_data[keys[2]].encode("utf-8")).hexdigest()
    nameHash = sha3_512(json_data[keys[1]].encode("utf-8")).hexdigest()
    date = json_data[keys[3]]
    ticketId = json_data[keys[0]]
    if json_data["valid"] == True:
        db_handler.del_entry(nameHash, emailHash, date, ticketId)

    return ("200", 200)


app.run()
