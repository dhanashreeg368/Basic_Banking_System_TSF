from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from json import JSONEncoder
from sympy import *
import copy
import pymongo
from pymongo import MongoClient
import datetime

app = Flask(__name__)
app.config["DEBUG"] = True
@app.route('/todo/api/v1.0/bank', methods=['POST'])

def create_task(): 
    print("hi")
    if not request.json or not 'sender' in request.json:
        abort(400)
    task = {
        'sender': request.json['sender'],
        'receiver': request.json['receiver'],
        'amt': request.json['amt']       
    }
    
    cluster=MongoClient("mongodb://localhost")
    db=cluster["db"]
    collection= db["BankDetails"]
    collection1=db["Transactions"]
    #a=collection.find({"mailid":"dhanashree@gmail.com"})
    #for i in a:
    sender=task["sender"]
    receiver=task["receiver"]
    amt=int(task["amt"])
    print(sender,receiver)
    key="success"
    #try:

    a=collection.find({"mailid":str(sender)})
    b=collection.find({"mailid":str(receiver)})
    c,d=int(a[0]["balance"]),int(b[0]["balance"])
    print(c,d)
    c-=amt
    d+=amt

    # Updating fan quantity form 10 to 25.
    filter = { "mailid": sender } 
    # Values to be updated.
    newvalues = { "$set": { 'balance': c } }
    # Using update_one() method for single 
    # updation.
    collection.update_one(filter, newvalues) 

    #receiver
    filter = { "mailid": receiver } 
    # Values to be updated.
    newvalues = { "$set": { 'balance': d } }
    # Using update_one() method for single 
    # updation.
    collection.update_one(filter, newvalues) 
    # current date and time
    #now = datetime.now()
    timestamp = datetime.datetime.now()
    print("timestamp =", timestamp)
    
    
    
    task["amt"]=[amt,c,d]
    
    '''except:
        task["amt"]=0
        key="Fail" '''
    collection1.insert_one({"sender":sender, "receiver":receiver, "amt":amt, "time":str(timestamp),"status":key})
    return jsonify({'task': task}), 201

key1=True
@app.route('/todo/api/v1.0/load', methods=['POST'])
def create_task2(): 
    print("hi")
    if not request.json or not 'sender' in request.json:
        abort(400)
    task = {
        'sender': request.json['sender']     
    }
    
    cluster=MongoClient("mongodb://localhost")
    db=cluster["db"]
    collection=db["BankDetails"]
    li=[]
    e=collection.find()
    for i in e:
        li.append(str(i['balance']))
    global key1
    if key1:
        key1=True
        task['sender']=li
        return jsonify({'task1': task}), 201


@app.route('/todo/api/v1.0/trans', methods=['POST'])

def create_task1(): 
    print("hi")
    if not request.json or not 'transactions' in request.json:
        abort(400)
    task = {
        'transactions': request.json['transactions']     
    }
    
    cluster=MongoClient("mongodb://localhost")
    db=cluster["db"]
    collection=db["Transactions"]
    li=[]
    e=collection.find()
    for i in e:
        if (len(li)==3):
            li.remove(li[0])
        li.append([str(i['sender']),str(i['receiver']),str(i['amt']),str(i['time']),str(i['status'])])
    task['transactions']=li
    return jsonify({'task': task}), 201

CORS(app)
app.run()




