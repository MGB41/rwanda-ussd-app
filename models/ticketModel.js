const { pool } = require('../utils/dbConfig');

class TicketModel {
  // Get all bus tickets
  static async getBusTickets() {
    try {
      const [rows] = await pool.query('SELECT * FROM bus_tickets WHERE available = 1');
      return rows;
    } catch (error) {
      console.error('Error fetching bus tickets:', error);
      throw error;
    }
  }

  // Get all event tickets
  static async getEventTickets() {
    try {
      const [rows] = await pool.query('SELECT * FROM event_tickets WHERE available = 1');
      return rows;
    } catch (error) {
      console.error('Error fetching event tickets:', error);
      throw error;
    }
  }

  // Get all flight tickets
  static async getFlightTickets() {
    try {
      const [rows] = await pool.query('SELECT * FROM flight_tickets WHERE available = 1');
      return rows;
    } catch (error) {
      console.error('Error fetching flight tickets:', error);
      throw error;
    }
  }

  // Book a ticket
  static async bookTicket(ticketId, ticketType, phoneNumber) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Get the table name based on ticket type
      const tableName = `${ticketType}_tickets`;
      
      // Check if ticket is available
      const [ticket] = await connection.query(
        `SELECT * FROM ${tableName} WHERE id = ? AND available = 1`, 
        [ticketId]
      );
      
      if (ticket.length === 0) {
        throw new Error('Ticket not available');
      }
      
      // Update ticket availability
      await connection.query(
        `UPDATE ${tableName} SET available = 0 WHERE id = ?`, 
        [ticketId]
      );
      
      // Record booking
      await connection.query(
        'INSERT INTO bookings (ticket_id, ticket_type, phone_number, booking_date) VALUES (?, ?, ?, NOW())',
        [ticketId, ticketType, phoneNumber]
      );
      
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      console.error('Error booking ticket:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = TicketModel;