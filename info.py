from flask_restful import Resource, reqparse
import psycopg2
from flask import jsonify



class Info(Resource):
    def get(self):
        # return "hello from farmers"
        dict1={}
        connection = psycopg2.connect(database="postgres",
            user="jordzawada",
            password="123456789",
            host="farmersmarket-1.cqyj9z6amn2q.us-east-1.rds.amazonaws.com",
            port='5432')
        cursor = connection.cursor()
        cursor.execute("SELECT farmers.id,farmers.name, lat, long, product_id, product.name FROM farmers_items JOIN farmers ON farmers_items.farmer_id= farmers.id JOIN product ON farmers_items.product_id = product.id")
        data=cursor.fetchall()
        # print(data[0])
        for row in data:
            if row[0] in dict1:
                # print(dict1[row[0]])
                dict1[row[0]]['products'].append(row[5])
            else:      
                dict1[row[0]]=self.buildDict(row)
            # arr1.append(row)
        connection.commit()
        connection.close()
        return jsonify(dict1)   

    # cursor.execute("SELECT * FROM farmers_items")
    # x=cursor.fetchall()
    # print(x)


    def buildDict(self,row):
        # if row[0]:
        #     row.products.append(row[5])   
        # else:    
            dictn={
                'id':row[0],
                'name':row[1],
                'latitude':float(row[2]),
                'longitude':float(row[3]),
                'products': [row[5]]
            }
            return dictn
    
       