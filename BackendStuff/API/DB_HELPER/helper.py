import mysql.connector

class DBAPI:
    def __init__(self, host, user, password, database):
        self.cursor = mysql.connector.connect(
                                              host=host,
                                              user=user,
                                              password=password,
                                              database=database)
    
    def insert_tickets(self, ticket_list):
        # ticketlist: [datestring, numberOfAvailableTicketsAdult, numberOfAvailableTicketsChildren]
        for item in ticket_list:
            