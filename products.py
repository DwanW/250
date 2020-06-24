from flask_restful import Resource, reqparse
import psycopg2
from flask import jsonify


class Products(Resource):
    
    def get(self):
        # return "hello from products"
        arr1=[]
        connection = psycopg2.connect(database="postgres",
            user="jordzawada",
            password="123456789",
            host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
            port='5432')
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM product")
        data=cursor.fetchall()
        for row in data:
            arr1.append(self.buildDict(row))
        connection.commit()
        connection.close()
        return jsonify(arr1)   

    def post(self,name):
        try:
            connection = psycopg2.connect(database="postgres",
                user="jordzawada",
                password="123456789",
                host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
                port='5432')
            cursor = connection.cursor()

            cursor.execute('SELECT max(id) from product')
            maxID=cursor.fetchall()[0][0]+1
            cursor.execute("INSERT INTO product(id,name) VALUES(%s,%s)", (maxID,name))
            # cursor.execute("INSERT INTO product VALUES(NULL,?)")
            connection.commit()
            connection.close()
            return {"message": "Product added"}, 201
        except:
            return {"message": "An error occurred inserting the item."},409

    def buildDict(self,row):
        dictn={
            'id':row[0],
            'name':row[1],
            
        }
        return dictn
       
       