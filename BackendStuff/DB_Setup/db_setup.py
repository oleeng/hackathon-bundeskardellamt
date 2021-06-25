import mysql.connector

def setupDB():
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root"
    )

    mycursor = mydb.cursor()

    mycursor.execute("CREATE DATABASE IF NOT EXISTS TicketDB")
    mycursor.execute("USE TicketDB;")
    mycursor.execute("CREATE TABLE IF NOT EXISTS AvailableTickets (date VARCHAR(255) PRIMARY KEY UNIQUE, availableTicketsAdult INT, avilableTicketsChildren INT)")
    mycursor.execute("Create Table IF NOT EXISTS BookedTickets (bookingID INT Auto_Increment PRIMARY KEY UNIQUE, exponent INT, BigN INT, emailHash VARCHAR(255), date VARCHAR(15))")
    mycursor.close()

if __name__ == "__main__":
    print("DB created")
    setupDB()