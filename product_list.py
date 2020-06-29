from flask_restful import Resource, reqparse
import psycopg2
from flask import jsonify, request


class ProductList(Resource):
    def post(self):
        # on the save button click, we need to update the farmers items database with any additions OR deletions. Lets start with adding.
        try:
            connection = psycopg2.connect(database="postgres",
                user="jordzawada",
                password="123456789",
                host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
                port='5432')
            data = request.get_json() # {"product_id": int,"farmers_items_ID":int ,"farmer_ID": int} OR get by checked, add a multi item dicitonary, but delete the old databse links?
            cursor = connection.cursor()
            cursor.execute('SELECT max(id) from farmers_items')
            maxID=cursor.fetchall()[0][0]+1
            cursor.execute("INSERT INTO farmers_items(id,farmer_id, product_id) VALUES(%s,%s,%s)", (maxID,data["farmer_id"],data["product_id"])) #name should come from what we have selected in the checkboxes. On initial load we have two already, so we need to disregard those. Perhaps an if statement? Pass in name as a json like farmer.py post method
            # cursor.execute("INSERT INTO product VALUES(NULL,?)")
            connection.commit()
            connection.close()
            return {"message": "Product added to farmers products list."}, 201
        except:
            return {"message": "An error occurred inserting the item to the farmers list."},409

    def buildDict(self,row):
        dictn={
            'id':row[0],
            'name':row[1],
            
        }
        return dictn
       
    # def get(self):
    #     # return "hello from products"
    #     arr1=[]
    #     connection = psycopg2.connect(database="postgres",
    #         user="jordzawada",
    #         password="123456789",
    #         host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
    #         port='5432')
    #     cursor = connection.cursor()
    #     cursor.execute("SELECT * FROM product")
    #     data=cursor.fetchall()
    #     for row in data:
    #         arr1.append(self.buildDict(row))
    #     connection.commit()
    #     connection.close()
    #     return jsonify(arr1)  