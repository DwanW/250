from flask_restful import Resource, reqparse
import sqlite3
from flask import jsonify


class Farmers(Resource):
    def get(self):
        # return "hello from farmers"
        arr1=[]
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        for row in cursor.execute("SELECT * FROM farmers"):
            arr1.append(self.buildDict(row))
        connection.commit()
        connection.close()
        return jsonify(arr1)   


    def buildDict(self,row):
        dictn={
            'id':row[0],
            'name':row[1],
            'latitude':row[2],
            'longitude':row[3],
        }
        return dictn
       
       