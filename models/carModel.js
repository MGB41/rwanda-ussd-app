const { pool } = require('../utils/dbConfig');

class CarModel {
  // Get all cars by type
  static async getCarsByType(type) {
    try {
      const [rows] = await pool.query('SELECT * FROM cars WHERE type = ? AND available = 1', [type]);
      return rows;
    } catch (error) {
      console.error(`Error fetching ${type} cars:`, error);
      throw error;
    }
  }

  // Get car details by ID
  static async getCarById(carId) {
    try {
      const [rows] = await pool.query('SELECT * FROM cars WHERE id = ?', [carId]);
      return rows[0];
    } catch (error) {
      console.error('Error fetching car details:', error);
      throw error;
    }
  }

  // Submit a car for sale
  static async submitCar(carDetails) {
    try {
      const { make, model, year, price, type, sellerPhone } = carDetails;
      const [result] = await pool.query(
        'INSERT INTO cars (make, model, year, price, type, seller_phone, available, created_at) VALUES (?, ?, ?, ?, ?, ?, 1, NOW())',
        [make, model, year, price, type, sellerPhone]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error submitting car for sale:', error);
      throw error;
    }
  }

  // Get average car prices by type
  static async getAveragePrices() {
    try {
      const [rows] = await pool.query(
        'SELECT type, AVG(price) as average_price FROM cars GROUP BY type'
      );
      return rows;
    } catch (error) {
      console.error('Error fetching average car prices:', error);
      throw error;
    }
  }
}

module.exports = CarModel;