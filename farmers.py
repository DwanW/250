from flask_restful import Resource, reqparse
import psycopg2
from flask import jsonify


class Farmers(Resource):
    def get(self):
        # return "hello from farmers"
        arr1=[]
        connection = psycopg2.connect(database="postgres",
            user="jordzawada",
            password="123456789",
            host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
            port='5432')
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM farmers")
        data=cursor.fetchall()
        for row in data:
            arr1.append(self.buildDict(row))
        connection.commit()
        connection.close()
        return jsonify(arr1)   

    # cursor.execute("SELECT * FROM farmers_items")
    # x=cursor.fetchall()
    # print(x)


    def buildDict(self,row):
        dictn={
            'id':row[0],
            'name':row[1],
            'latitude':float(row[3]),
            'longitude':float(row[2]),
        }
        return dictn
       
       