from logging import fatal
import mysql.connector
from datetime import datetime
import time

class DBAPI:
    def __init__(self, host, user, password, database):
        self.ticketdb = mysql.connector.connect(
                                              host=host,
                                              user=user,
                                              password=password,
                                              database=database)
        self.cursor = self.ticketdb.cursor()
    
    def insert_tickets(self, ticket_list):
        # ticketlist: [(datestring, numberOfAvailableTicketsAdult), (datestring, numberOfAvailableTicketsAdult)]
        now = time.time()
        for item in ticket_list:
            if self.__datestring_good(item[0], now):
                sql = "INSERT INTO AvailableTickets (date, availableTickets) VALUES (%s, %s);"
                self.cursor.execute(sql, item)
            else:
                print("Database error: date is too old for %s" % item[0])

        self.ticketdb.commit()
        print("Inserted %s rows" % (self.cursor.rowcount))
    
    def __check_date(self, date):
        try:
            datestring_day = int(date.split(".")[0])
            datestring_month = int(date.split(".")[1])
            datestring_year = int(date.split(".")[2])
        except(ValueError, IndexError):
            print("Error, worng Date String")
            return False
        
        return True
    def get_tickets_by_date(self, date):
        if not self.__check_date(date):
            return 0
        
        self.cursor.execute("SELECT availableTickets from AvailableTickets Where date='%s';" % (date))
        return self.cursor.fetchall()[0][0]
    
    def update_tickets_by_date(self, ticket_count, date):
        if not self.__check_date(date):
            return False

        self.cursor.execute("UPDATE availableTickets SET availableTickets=%s WHERE date='%s';" % (ticket_count, date))
        self.ticketdb.commit()
        return True

    def insert_booked_ticket(self, exponent, bigN, emailHash, nameHash, date):
        if not self.__check_date(date):
            return False
        
        self.cursor.execute("INSERT into BookedTickets (exponent, bigN, emailHash, nameHash, date)values (%s, %s,%s,%s,%s) ", (exponent, bigN, emailHash, nameHash, date))
        self.ticketdb.commit()
        return True

    def query_all (self, namehash, emailhash, date, bookingId):
        self.cursor.execute("SELECT * FROM BookedTickets WHERE bookingID=%s AND nameHash='%s' AND emailHash='%s' AND date='%s';" %(bookingId, namehash, emailhash, date))
        return self.cursor.fetchall()


    def del_entry (self, namehash, emailhash, date, bookingId):
        self.cursor.execute("Delete FROM BookedTickets WHERE bookingID=%s AND nameHash='%s' AND emailHash='%s' AND date='%s';" %(bookingId, namehash, emailhash, date))
        self.ticketdb.commit()

    def __datestring_good(self, datestring, now):
        datestring_day = int(datestring.split(".")[0])
        datestring_month = int(datestring.split(".")[1])
        datestring_year = int(datestring.split(".")[2])
        datestring_epoch = int(datetime(datestring_year, datestring_month, datestring_day, 23, 59, 59).timestamp())

        if datestring_epoch >= now:
            return True
        
        return False

if __name__ == "__main__":
    testdb = DBAPI("localhost", "root", "root", "TicketDB")
    ticket_list = [("25.06.2021", 100), ("26.06.2021", 105)]
    #testdb.insert_tickets(ticket_list)
    testdb.get_tickets_by_date("25.06.2021")
    testdb.insert_booked_ticket(3, 17, "jhashdjashd", "jjahsdjha", "25.06.2021")
    print(testdb.query_all("jjahsdjha", "jhashdjashd", "25.06.2021", 1))
    testdb.del_entry("jjahsdjha", "jhashdjashd", "25.06.2021", 1)