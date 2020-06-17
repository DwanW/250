import sqlite3
from openpyxl import Workbook, load_workbook 


connection = sqlite3.connect('data.db')

cursor = connection.cursor()

# MUST BE INTEGER
# This is the only place where int vs INTEGER matters—in auto-incrementing columns
create_table = "CREATE TABLE IF NOT EXISTS farmers (id INTEGER PRIMARY KEY, name text, lat int, long int)"
cursor.execute(create_table)

wb = load_workbook('./farmersmarkets.xlsx')
 
# for row in wb['farmersmarkets']:
#      # print(row[3].value)
#     x = f"INSERT INTO farmers VALUES(null,{row[3].value},{row[15].value},{row[16].value}) "
#     cursor.execute(x)
def addRows():
    insert = "INSERT into farmers VALUES(NULL,?,?,?)"
    for row in wb['farmersmarkets'].iter_rows(min_row=2, max_row=wb['farmersmarkets'].max_row, values_only=True):   
        cursor.execute(insert, (row[3], row[15], row[16]))
    
# def viewTable():
#     for row in cursor.execute("SELECT * FROM farmers"):
#         print(list(row))

# viewTable()
connection.commit()

connection.close()