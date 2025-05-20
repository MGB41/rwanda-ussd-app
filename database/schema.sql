-- Create database
CREATE DATABASE IF NOT EXISTS rwanda_ussd;
USE rwanda_ussd;

-- Bus tickets table
CREATE TABLE IF NOT EXISTS bus_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route VARCHAR(100) NOT NULL,
  departure_time TIME NOT NULL,
  departure_date DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event tickets table
CREATE TABLE IF NOT EXISTS event_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  venue VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flight tickets table
CREATE TABLE IF NOT EXISTS flight_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  flight_number VARCHAR(20) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  type ENUM('sedan', 'suv', 'truck', 'hatchback', 'other') NOT NULL,
  description TEXT,
  seller_phone VARCHAR(20) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT NOT NULL,
  ticket_type ENUM('bus', 'event', 'flight') NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending'
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for bus tickets
INSERT INTO bus_tickets (route, departure_time, departure_date, price, available) VALUES
('Kigali-Butare', '08:00:00', CURDATE(), 5000.00, TRUE),
('Kigali-Butare', '14:00:00', CURDATE(), 5000.00, TRUE),
('Kigali-Gisenyi', '07:00:00', CURDATE(), 7000.00, TRUE),
('Kigali-Gisenyi', '18:00:00', CURDATE(), 7000.00, TRUE);

-- Sample data for event tickets
INSERT INTO event_tickets (event_name, event_date, event_time, venue, price, available) VALUES
('Kigali Jazz Festival', DATE_ADD(CURDATE(), INTERVAL 10 DAY), '19:00:00', 'Kigali Convention Center', 10000.00, TRUE),
('Afrobeats Night', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '20:00:00', 'Kigali Arena', 8000.00, TRUE),
('Rwanda vs Uganda Football', DATE_ADD(CURDATE(), INTERVAL 15 DAY), '15:00:00', 'Amahoro Stadium', 5000.00, TRUE),
('Basketball Tournament', DATE_ADD(CURDATE(), INTERVAL 7 DAY), '14:00:00', 'Kigali Arena', 3000.00, TRUE);

-- Sample data for flight tickets
INSERT INTO flight_tickets (flight_number, origin, destination, departure_date, departure_time, price, available) VALUES
('RW101', 'Kigali', 'Kamembe', DATE_ADD(CURDATE(), INTERVAL 3 DAY), '09:00:00', 120.00, TRUE),
('RW201', 'Kigali', 'Nairobi', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '10:30:00', 250.00, TRUE),
('RW301', 'Kigali', 'Johannesburg', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '08:45:00', 450.00, TRUE);

-- Sample data for cars
INSERT INTO cars (make, model, year, price, type, description, seller_phone, available) VALUES
('Toyota', 'Corolla', 2015, 8000.00, 'sedan', 'Good condition, low mileage', '+250780123456', TRUE),
('Honda', 'Civic', 2016, 7500.00, 'sedan', 'Well maintained, single owner', '+250780123457', TRUE),
('Toyota', 'RAV4', 2017, 15000.00, 'suv', 'Perfect family car, all wheel drive', '+250780123458', TRUE),
('Honda', 'CR-V', 2018, 14000.00, 'suv', 'Low mileage, excellent condition', '+250780123459', TRUE);