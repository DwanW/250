from flask_restful import Resource, reqparse
import psycopg2
from flask import jsonify, request


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

    def post(self):
        try:
            connection = psycopg2.connect(database="postgres",
                user="jordzawada",
                password="123456789",
                host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
                port='5432')
            cursor = connection.cursor()
            data = request.get_json()
            cursor.execute('SELECT max(id) from farmers')
            maxID=cursor.fetchall()[0][0]+1
           
            cursor.execute("INSERT INTO farmers(id,name,lat,long) VALUES(%s,%s,%s,%s)", (maxID,data["name"],data["Latitude"],data["Longitude"]))
            connection.commit()
            connection.close()
            return {"message": f"Farmer added {data}"}, 201
        except:
            return {"message": "An error occurred inserting the Farmer."},409    

    def delete(self, _id):
        try:
            connection = psycopg2.connect(database="postgres",
                user="jordzawada",
                password="123456789",
                host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
                port='5432')
            cursor = connection.cursor()
            # data = request.get_json()
            _id=int(_id)
            delete_q = f"DELETE FROM farmers WHERE id = {_id};"
            print(delete_q)
            cursor.execute(delete_q)
            connection.commit()
            connection.close()
            return {"message": f"Farmer deleted"}, 201
        except:
            return {"message": "An error occurred Delete the Farmer."},409 



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
       
       