const translations = require('./translations');
const TicketModel = require('../models/ticketModel');
const CarModel = require('../models/carModel');
const { testConnection } = require('./dbConfig');

class MenuHandler {
  constructor() {
    this.sessions = {};
    this.initDatabase();
  }

  async initDatabase() {
    try {
      await testConnection();
    } catch (error) {
      console.error('Failed to initialize database:', error);
    }
  }

  async handleMenu(sessionId, userInput, phoneNumber) {
    // Initialize session if it doesn't exist
    if (!this.sessions[sessionId]) {
      this.sessions[sessionId] = {
        language: 'en',
        level: 'welcome',
        history: [],
        lastActivity: Date.now(),
        phoneNumber: phoneNumber,
        data: {} // Store temporary data like selected items
      };
    }

    // Update last activity timestamp
    this.sessions[sessionId].lastActivity = Date.now();

    const session = this.sessions[sessionId];
    const { language, level } = session;

    // First-time user with no input
    if (!userInput) {
      return {
        response: translations[language].welcome,
        endSession: false
      };
    }

    try {
      // Process user input based on current level
      switch (level) {
        case 'welcome':
          return this.handleWelcomeMenu(session, userInput);
        case 'buyTickets':
          return this.handleBuyTicketsMenu(session, userInput);
        case 'carMarketplace':
          return this.handleCarMarketplaceMenu(session, userInput);
        case 'contactUs':
          return this.handleContactUsMenu(session, userInput);
        case 'busTickets':
          return await this.handleBusTicketsMenu(session, userInput);
        case 'eventTickets':
          return await this.handleEventTicketsMenu(session, userInput);
        case 'flightTickets':
          return await this.handleFlightTicketsMenu(session, userInput);
        case 'browseCars':
          return await this.handleBrowseCarsMenu(session, userInput);
        case 'sellYourCar':
          return await this.handleSellYourCarMenu(session, userInput);
        case 'selectBusTicket':
          return await this.handleSelectBusTicket(session, userInput);
        case 'selectEventTicket':
          return await this.handleSelectEventTicket(session, userInput);
        case 'selectFlightTicket':
          return await this.handleSelectFlightTicket(session, userInput);
        case 'selectCar':
          return await this.handleSelectCar(session, userInput);
        case 'confirmPurchase':
          return await this.handleConfirmPurchase(session, userInput);
        case 'carDetails':
          return await this.handleCarDetails(session, userInput);
        case 'submitCarForm':
          return await this.handleSubmitCarForm(session, userInput);
        default:
          return {
            response: translations[language].welcome,
            endSession: false
          };
      }
    } catch (error) {
      console.error('Error handling menu:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  handleWelcomeMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'buyTickets';
        session.history.push('welcome');
        return {
          response: translations[language].buyTickets,
          endSession: false
        };
      case '2':
        session.level = 'carMarketplace';
        session.history.push('welcome');
        return {
          response: translations[language].carMarketplace,
          endSession: false
        };
      case '3':
        // Toggle language
        session.language = language === 'en' ? 'rw' : 'en';
        return {
          response: translations[session.language].welcome,
          endSession: false
        };
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].welcome,
          endSession: false
        };
    }
  }

  handleBuyTicketsMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'busTickets';
        session.history.push('buyTickets');
        return {
          response: translations[language].busTickets,
          endSession: false
        };
      case '2':
        session.level = 'eventTickets';
        session.history.push('buyTickets');
        return {
          response: translations[language].eventTickets,
          endSession: false
        };
      case '3':
        session.level = 'flightTickets';
        session.history.push('buyTickets');
        return {
          response: translations[language].flightTickets,
          endSession: false
        };
      case '4':
        // Back to main menu
        session.level = 'welcome';
        session.history = [];
        return {
          response: translations[language].welcome,
          endSession: false
        };
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].buyTickets,
          endSession: false
        };
    }
  }

  handleCarMarketplaceMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'browseCars';
        session.history.push('carMarketplace');
        return {
          response: translations[language].browseCars,
          endSession: false
        };
      case '2':
        session.level = 'sellYourCar';
        session.history.push('carMarketplace');
        return {
          response: translations[language].sellYourCar,
          endSession: false
        };
      case '3':
        // Back to main menu
        session.level = 'welcome';
        session.history = [];
        return {
          response: translations[language].welcome,
          endSession: false
        };
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].carMarketplace,
          endSession: false
        };
    }
  }

  handleContactUsMenu(session, userInput) {
    const { language } = session;
    
    if (userInput === '1') {
      session.level = 'welcome';
      session.history = [];
      return {
        response: translations[language].welcome,
        endSession: false
      };
    } else {
      return {
        response: translations[language].invalidOption + '\n' + translations[language].contactUs,
        endSession: false
      };
    }
  }

  handleBusTicketsMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'kigaliButare';
        session.history.push('busTickets');
        return {
          response: translations[language].kigaliButare,
          endSession: false
        };
      case '2':
        session.level = 'kigaliGisenyi';
        session.history.push('busTickets');
        return {
          response: translations[language].kigaliGisenyi,
          endSession: false
        };
      case '3':
        // Go back
        return this.goBack(session);
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].busTickets,
          endSession: false
        };
    }
  }

  handleEventTicketsMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'concerts';
        session.history.push('eventTickets');
        return {
          response: translations[language].concerts,
          endSession: false
        };
      case '2':
        session.level = 'sportsEvents';
        session.history.push('eventTickets');
        return {
          response: translations[language].sportsEvents,
          endSession: false
        };
      case '3':
        // Go back
        return this.goBack(session);
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].eventTickets,
          endSession: false
        };
    }
  }

  handleFlightTicketsMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'domesticFlights';
        session.history.push('flightTickets');
        return {
          response: translations[language].domesticFlights,
          endSession: false
        };
      case '2':
        session.level = 'internationalFlights';
        session.history.push('flightTickets');
        return {
          response: translations[language].internationalFlights,
          endSession: false
        };
      case '3':
        // Go back
        return this.goBack(session);
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].flightTickets,
          endSession: false
        };
    }
  }

  handleBrowseCarsMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'sedanCars';
        session.history.push('browseCars');
        return {
          response: translations[language].sedanCars,
          endSession: false
        };
      case '2':
        session.level = 'suvCars';
        session.history.push('browseCars');
        return {
          response: translations[language].suvCars,
          endSession: false
        };
      case '3':
        // Go back
        return this.goBack(session);
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].browseCars,
          endSession: false
        };
    }
  }

  handleSellYourCarMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'submitCarDetails';
        session.history.push('sellYourCar');
        return {
          response: translations[language].submitCarDetails,
          endSession: false
        };
      case '2':
        session.level = 'pricingGuide';
        session.history.push('sellYourCar');
        return {
          response: translations[language].pricingGuide,
          endSession: false
        };
      case '3':
        // Go back
        return this.goBack(session);
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].sellYourCar,
          endSession: false
        };
    }
  }

  handleSubMenu(session, userInput) {
    // For all leaf menus, option 1 or 3 is "Back"
    if (userInput === '1' || userInput === '3') {
      return this.goBack(session);
    } else {
      const { language, level } = session;
      return {
        response: translations[language].invalidOption + '\n' + translations[language][level],
        endSession: false
      };
    }
  }

  goBack(session) {
    const { language, history } = session;
    
    if (history.length > 0) {
      const previousLevel = history.pop();
      session.level = previousLevel;
      return {
        response: translations[language][previousLevel],
        endSession: false
      };
    } else {
      session.level = 'welcome';
      return {
        response: translations[language].welcome,
        endSession: false
      };
    }
  }

  // Clean up expired sessions
  cleanupSessions() {
    const now = Date.now();
    Object.keys(this.sessions).forEach(sessionId => {
      if (now - this.sessions[sessionId].lastActivity > 30 * 60 * 1000) { // 30 minutes
        delete this.sessions[sessionId];
      }
    });
  }
}

module.exports = new MenuHandler();
  handleBuyTicketsMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'busTickets';
        session.history.push('buyTickets');
        return {
          response: translations[language].busTickets,
          endSession: false
        };
      case '2':
        session.level = 'eventTickets';
        session.history.push('buyTickets');
        return {
          response: translations[language].eventTickets,
          endSession: false
        };
      case '3':
        session.level = 'flightTickets';
        session.history.push('buyTickets');
        return {
          response: translations[language].flightTickets,
          endSession: false
        };
      case '4':
        // Back to main menu
        session.level = 'welcome';
        session.history = [];
        return {
          response: translations[language].welcome,
          endSession: false
        };
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].buyTickets,
          endSession: false
        };
    }
  }

  handleCarMarketplaceMenu(session, userInput) {
    const { language } = session;
    
    switch (userInput) {
      case '1':
        session.level = 'browseCars';
        session.history.push('carMarketplace');
        return {
          response: translations[language].browseCars,
          endSession: false
        };
      case '2':
        session.level = 'sellYourCar';
        session.history.push('carMarketplace');
        return {
          response: translations[language].sellYourCar,
          endSession: false
        };
      case '3':
        // Back to main menu
        session.level = 'welcome';
        session.history = [];
        return {
          response: translations[language].welcome,
          endSession: false
        };
      default:
        return {
          response: translations[language].invalidOption + '\n' + translations[language].carMarketplace,
          endSession: false
        };
    }
  }

  handleContactUsMenu(session, userInput) {
    const { language } = session;
    
    if (userInput === '1') {
      session.level = 'welcome';
      session.history = [];
      return {
        response: translations[language].welcome,
        endSession: false
      };
    } else {
      return {
        response: translations[language].invalidOption + '\n' + translations[language].contactUs,
        endSession: false
      };
    }
  }

  async handleBusTicketsMenu(session, userInput) {
    const { language } = session;
    
    try {
      // Fetch bus tickets from database
      const busTickets = await TicketModel.getBusTickets();
      
      // Store tickets in session for later reference
      session.data.busTickets = busTickets;
      
      if (userInput === '1') {
        // Filter Kigali-Butare tickets
        const kigaliButareTickets = busTickets.filter(ticket => ticket.route === 'Kigali-Butare');
        session.data.selectedRouteTickets = kigaliButareTickets;
        
        // Format tickets for display
        let ticketOptions = translations[language].selectBusTicket + '\n';
        kigaliButareTickets.forEach((ticket, index) => {
          const date = new Date(ticket.departure_date).toLocaleDateString();
          const time = ticket.departure_time.slice(0, 5);
          ticketOptions += `${index + 1}. ${date} at ${time} - ${ticket.price} RWF\n`;
        });
        ticketOptions += `${kigaliButareTickets.length + 1}. Back`;
        
        session.level = 'selectBusTicket';
        session.history.push('busTickets');
        return {
          response: ticketOptions,
          endSession: false
        };
      } else if (userInput === '2') {
        // Filter Kigali-Gisenyi tickets
        const kigaliGisenyiTickets = busTickets.filter(ticket => ticket.route === 'Kigali-Gisenyi');
        session.data.selectedRouteTickets = kigaliGisenyiTickets;
        
        // Format tickets for display
        let ticketOptions = translations[language].selectBusTicket + '\n';
        kigaliGisenyiTickets.forEach((ticket, index) => {
          const date = new Date(ticket.departure_date).toLocaleDateString();
          const time = ticket.departure_time.slice(0, 5);
          ticketOptions += `${index + 1}. ${date} at ${time} - ${ticket.price} RWF\n`;
        });
        ticketOptions += `${kigaliGisenyiTickets.length + 1}. Back`;
        
        session.level = 'selectBusTicket';
        session.history.push('busTickets');
        return {
          response: ticketOptions,
          endSession: false
        };
      } else if (userInput === '3') {
        // Go back
        return this.goBack(session);
      } else {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].busTickets,
          endSession: false
        };
      }
    } catch (error) {
      console.error('Error handling bus tickets menu:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleEventTicketsMenu(session, userInput) {
    const { language } = session;
    
    try {
      // Fetch event tickets from database
      const eventTickets = await TicketModel.getEventTickets();
      
      // Store tickets in session for later reference
      session.data.eventTickets = eventTickets;
      
      if (userInput === '1') {
        // Filter concert tickets
        const concertTickets = eventTickets.filter(ticket => 
          ticket.event_name.toLowerCase().includes('festival') || 
          ticket.event_name.toLowerCase().includes('night')
        );
        session.data.selectedEventTickets = concertTickets;
        
        // Format tickets for display
        let ticketOptions = translations[language].selectEventTicket + '\n';
        concertTickets.forEach((ticket, index) => {
          const date = new Date(ticket.event_date).toLocaleDateString();
          const time = ticket.event_time.slice(0, 5);
          ticketOptions += `${index + 1}. ${ticket.event_name} - ${date} at ${time} - ${ticket.price} RWF\n`;
        });
        ticketOptions += `${concertTickets.length + 1}. Back`;
        
        session.level = 'selectEventTicket';
        session.history.push('eventTickets');
        return {
          response: ticketOptions,
          endSession: false
        };
      } else if (userInput === '2') {
        // Filter sports tickets
        const sportsTickets = eventTickets.filter(ticket => 
          ticket.event_name.toLowerCase().includes('football') || 
          ticket.event_name.toLowerCase().includes('basketball')
        );
        session.data.selectedEventTickets = sportsTickets;
        
        // Format tickets for display
        let ticketOptions = translations[language].selectEventTicket + '\n';
        sportsTickets.forEach((ticket, index) => {
          const date = new Date(ticket.event_date).toLocaleDateString();
          const time = ticket.event_time.slice(0, 5);
          ticketOptions += `${index + 1}. ${ticket.event_name} - ${date} at ${time} - ${ticket.price} RWF\n`;
        });
        ticketOptions += `${sportsTickets.length + 1}. Back`;
        
        session.level = 'selectEventTicket';
        session.history.push('eventTickets');
        return {
          response: ticketOptions,
          endSession: false
        };
      } else if (userInput === '3') {
        // Go back
        return this.goBack(session);
      } else {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].eventTickets,
          endSession: false
        };
      }
    } catch (error) {
      console.error('Error handling event tickets menu:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleFlightTicketsMenu(session, userInput) {
    const { language } = session;
    
    try {
      // Fetch flight tickets from database
      const flightTickets = await TicketModel.getFlightTickets();
      
      // Store tickets in session for later reference
      session.data.flightTickets = flightTickets;
      
      if (userInput === '1') {
        // Filter domestic flights
        const domesticFlights = flightTickets.filter(ticket => 
          ticket.origin === 'Kigali' && ticket.destination === 'Kamembe'
        );
        session.data.selectedFlightTickets = domesticFlights;
        
        // Format tickets for display
        let ticketOptions = translations[language].selectFlightTicket + '\n';
        domesticFlights.forEach((ticket, index) => {
          const date = new Date(ticket.departure_date).toLocaleDateString();
          const time = ticket.departure_time.slice(0, 5);
          ticketOptions += `${index + 1}. ${ticket.flight_number} - ${ticket.origin} to ${ticket.destination} - ${date} at ${time} - $${ticket.price}\n`;
        });
        ticketOptions += `${domesticFlights.length + 1}. Back`;
        
        session.level = 'selectFlightTicket';
        session.history.push('flightTickets');
        return {
          response: ticketOptions,
          endSession: false
        };
      } else if (userInput === '2') {
        // Filter international flights
        const internationalFlights = flightTickets.filter(ticket => 
          ticket.origin === 'Kigali' && 
          (ticket.destination === 'Nairobi' || ticket.destination === 'Johannesburg')
        );
        session.data.selectedFlightTickets = internationalFlights;
        
        // Format tickets for display
        let ticketOptions = translations[language].selectFlightTicket + '\n';
        internationalFlights.forEach((ticket, index) => {
          const date = new Date(ticket.departure_date).toLocaleDateString();
          const time = ticket.departure_time.slice(0, 5);
          ticketOptions += `${index + 1}. ${ticket.flight_number} - ${ticket.origin} to ${ticket.destination} - ${date} at ${time} - $${ticket.price}\n`;
        });
        ticketOptions += `${internationalFlights.length + 1}. Back`;
        
        session.level = 'selectFlightTicket';
        session.history.push('flightTickets');
        return {
          response: ticketOptions,
          endSession: false
        };
      } else if (userInput === '3') {
        // Go back
        return this.goBack(session);
      } else {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].flightTickets,
          endSession: false
        };
      }
    } catch (error) {
      console.error('Error handling flight tickets menu:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleBrowseCarsMenu(session, userInput) {
    const { language } = session;
    
    try {
      if (userInput === '1') {
        // Get sedan cars
        const sedanCars = await CarModel.getCarsByType('sedan');
        session.data.selectedCars = sedanCars;
        
        // Format cars for display
        let carOptions = translations[language].selectCar + '\n';
        sedanCars.forEach((car, index) => {
          carOptions += `${index + 1}. ${car.make} ${car.model} (${car.year}) - $${car.price}\n`;
        });
        carOptions += `${sedanCars.length + 1}. Back`;
        
        session.level = 'selectCar';
        session.history.push('browseCars');
        return {
          response: carOptions,
          endSession: false
        };
      } else if (userInput === '2') {
        // Get SUV cars
        const suvCars = await CarModel.getCarsByType('suv');
        session.data.selectedCars = suvCars;
        
        // Format cars for display
        let carOptions = translations[language].selectCar + '\n';
        suvCars.forEach((car, index) => {
          carOptions += `${index + 1}. ${car.make} ${car.model} (${car.year}) - $${car.price}\n`;
        });
        carOptions += `${suvCars.length + 1}. Back`;
        
        session.level = 'selectCar';
        session.history.push('browseCars');
        return {
          response: carOptions,
          endSession: false
        };
      } else if (userInput === '3') {
        // Go back
        return this.goBack(session);
      } else {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].browseCars,
          endSession: false
        };
      }
    } catch (error) {
      console.error('Error handling browse cars menu:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleSellYourCarMenu(session, userInput) {
    const { language } = session;
    
    try {
      if (userInput === '1') {
        session.level = 'submitCarForm';
        session.history.push('sellYourCar');
        session.data.carFormStep = 1;
        return {
          response: translations[language].enterCarMake,
          endSession: false
        };
      } else if (userInput === '2') {
        // Get average car prices
        const averagePrices = await CarModel.getAveragePrices();
        
        // Format pricing guide
        let pricingGuide = translations[language].pricingGuide + '\n';
        averagePrices.forEach(item => {
          pricingGuide += `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}: $${Math.round(item.average_price)}\n`;
        });
        pricingGuide += `\n1. Back`;
        
        return {
          response: pricingGuide,
          endSession: false
        };
      } else if (userInput === '3') {
        // Go back
        return this.goBack(session);
      } else {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].sellYourCar,
          endSession: false
        };
      }
    } catch (error) {
      console.error('Error handling sell your car menu:', error);
      return {
                response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleSelectBusTicket(session, userInput) {
    const { language } = session;
    const { selectedRouteTickets } = session.data;
    
    try {
      const selectedIndex = parseInt(userInput) - 1;
      
      // Check if user selected "Back"
      if (selectedIndex === selectedRouteTickets.length) {
        return this.goBack(session);
      }
      
      // Validate selection
      if (selectedIndex < 0 || selectedIndex >= selectedRouteTickets.length) {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].selectBusTicket,
          endSession: false
        };
      }
      
      // Store selected ticket
      const selectedTicket = selectedRouteTickets[selectedIndex];
      session.data.selectedTicket = selectedTicket;
      
      // Format confirmation message
      const date = new Date(selectedTicket.departure_date).toLocaleDateString();
      const time = selectedTicket.departure_time.slice(0, 5);
      const confirmMessage = `${translations[language].confirmPurchase}\n${selectedTicket.route} - ${date} at ${time} - ${selectedTicket.price} RWF\n1. Confirm\n2. Cancel`;
      
      session.level = 'confirmPurchase';
      session.data.ticketType = 'bus';
      session.history.push('selectBusTicket');
      
      return {
        response: confirmMessage,
        endSession: false
      };
    } catch (error) {
      console.error('Error handling bus ticket selection:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleSelectEventTicket(session, userInput) {
    const { language } = session;
    const { selectedEventTickets } = session.data;
    
    try {
      const selectedIndex = parseInt(userInput) - 1;
      
      // Check if user selected "Back"
      if (selectedIndex === selectedEventTickets.length) {
        return this.goBack(session);
      }
      
      // Validate selection
      if (selectedIndex < 0 || selectedIndex >= selectedEventTickets.length) {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].selectEventTicket,
          endSession: false
        };
      }
      
      // Store selected ticket
      const selectedTicket = selectedEventTickets[selectedIndex];
      session.data.selectedTicket = selectedTicket;
      
      // Format confirmation message
      const date = new Date(selectedTicket.event_date).toLocaleDateString();
      const time = selectedTicket.event_time.slice(0, 5);
      const confirmMessage = `${translations[language].confirmPurchase}\n${selectedTicket.event_name} - ${date} at ${time} - ${selectedTicket.price} RWF\n1. Confirm\n2. Cancel`;
      
      session.level = 'confirmPurchase';
      session.data.ticketType = 'event';
      session.history.push('selectEventTicket');
      
      return {
        response: confirmMessage,
        endSession: false
      };
    } catch (error) {
      console.error('Error handling event ticket selection:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleSelectFlightTicket(session, userInput) {
    const { language } = session;
    const { selectedFlightTickets } = session.data;
    
    try {
      const selectedIndex = parseInt(userInput) - 1;
      
      // Check if user selected "Back"
      if (selectedIndex === selectedFlightTickets.length) {
        return this.goBack(session);
      }
      
      // Validate selection
      if (selectedIndex < 0 || selectedIndex >= selectedFlightTickets.length) {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].selectFlightTicket,
          endSession: false
        };
      }
      
      // Store selected ticket
      const selectedTicket = selectedFlightTickets[selectedIndex];
      session.data.selectedTicket = selectedTicket;
      
      // Format confirmation message
      const date = new Date(selectedTicket.departure_date).toLocaleDateString();
      const time = selectedTicket.departure_time.slice(0, 5);
      const confirmMessage = `${translations[language].confirmPurchase}\n${selectedTicket.flight_number} - ${selectedTicket.origin} to ${selectedTicket.destination} - ${date} at ${time} - $${selectedTicket.price}\n1. Confirm\n2. Cancel`;
      
      session.level = 'confirmPurchase';
      session.data.ticketType = 'flight';
      session.history.push('selectFlightTicket');
      
      return {
        response: confirmMessage,
        endSession: false
      };
    } catch (error) {
      console.error('Error handling flight ticket selection:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleSelectCar(session, userInput) {
    const { language } = session;
    const { selectedCars } = session.data;
    
    try {
      const selectedIndex = parseInt(userInput) - 1;
      
      // Check if user selected "Back"
      if (selectedIndex === selectedCars.length) {
        return this.goBack(session);
      }
      
      // Validate selection
      if (selectedIndex < 0 || selectedIndex >= selectedCars.length) {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].selectCar,
          endSession: false
        };
      }
      
      // Store selected car
      const selectedCar = selectedCars[selectedIndex];
      session.data.selectedCar = selectedCar;
      
      // Format car details
      const carDetails = `${translations[language].carDetails}\n${selectedCar.make} ${selectedCar.model} (${selectedCar.year})\n${translations[language].price}: $${selectedCar.price}\n${translations[language].description}: ${selectedCar.description}\n${translations[language].contactSeller}: ${selectedCar.seller_phone}\n\n1. Back`;
      
      session.level = 'carDetails';
      session.history.push('selectCar');
      
      return {
        response: carDetails,
        endSession: false
      };
    } catch (error) {
      console.error('Error handling car selection:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleConfirmPurchase(session, userInput) {
    const { language } = session;
    const { selectedTicket, ticketType } = session.data;
    
    try {
      if (userInput === '1') {
        // Confirm purchase
        await TicketModel.bookTicket(selectedTicket.id, ticketType, session.phoneNumber);
        
        // Send confirmation message
        return {
          response: translations[language].purchaseConfirmed,
          endSession: true
        };
      } else if (userInput === '2') {
        // Cancel purchase
        return this.goBack(session);
      } else {
        return {
          response: translations[language].invalidOption + '\n' + translations[language].confirmPurchase,
          endSession: false
        };
      }
    } catch (error) {
      console.error('Error handling purchase confirmation:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  async handleCarDetails(session, userInput) {
    // Only option is to go back
    if (userInput === '1') {
      return this.goBack(session);
    } else {
      const { language } = session;
      const { selectedCar } = session.data;
      
      // Re-display car details with invalid option message
      const carDetails = `${translations[language].invalidOption}\n\n${translations[language].carDetails}\n${selectedCar.make} ${selectedCar.model} (${selectedCar.year})\n${translations[language].price}: $${selectedCar.price}\n${translations[language].description}: ${selectedCar.description}\n${translations[language].contactSeller}: ${selectedCar.seller_phone}\n\n1. Back`;
      
      return {
        response: carDetails,
        endSession: false
      };
    }
  }

  async handleSubmitCarForm(session, userInput) {
    const { language } = session;
    const { carFormStep } = session.data;
    
    try {
      // Initialize car details object if it doesn't exist
      if (!session.data.carDetails) {
        session.data.carDetails = {};
      }
      
      // Process form steps
      switch (carFormStep) {
        case 1: // Car make
          session.data.carDetails.make = userInput;
          session.data.carFormStep = 2;
          return {
            response: translations[language].enterCarModel,
            endSession: false
          };
        case 2: // Car model
          session.data.carDetails.model = userInput;
          session.data.carFormStep = 3;
          return {
            response: translations[language].enterCarYear,
            endSession: false
          };
        case 3: // Car year
          const year = parseInt(userInput);
          if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            return {
              response: translations[language].invalidYear + '\n' + translations[language].enterCarYear,
              endSession: false
            };
          }
          session.data.carDetails.year = year;
          session.data.carFormStep = 4;
          return {
            response: translations[language].enterCarPrice,
            endSession: false
          };
        case 4: // Car price
          const price = parseFloat(userInput);
          if (isNaN(price) || price <= 0) {
            return {
              response: translations[language].invalidPrice + '\n' + translations[language].enterCarPrice,
              endSession: false
            };
          }
          session.data.carDetails.price = price;
          session.data.carFormStep = 5;
          return {
            response: translations[language].selectCarType + '\n1. Sedan\n2. SUV\n3. Other',
            endSession: false
          };
        case 5: // Car type
          let carType;
          switch (userInput) {
            case '1': carType = 'sedan'; break;
            case '2': carType = 'suv'; break;
            case '3': carType = 'other'; break;
            default:
              return {
                response: translations[language].invalidOption + '\n' + translations[language].selectCarType + '\n1. Sedan\n2. SUV\n3. Other',
                endSession: false
              };
          }
          session.data.carDetails.type = carType;
          
          // Submit car to database
          const carDetails = {
            ...session.data.carDetails,
            sellerPhone: session.phoneNumber
          };
          
          await CarModel.submitCar(carDetails);
          
          // Return success message
          return {
            response: translations[language].carSubmitSuccess,
            endSession: true
          };
      }
    } catch (error) {
      console.error('Error handling car submission form:', error);
      return {
        response: translations[language].errorOccurred,
        endSession: false
      };
    }
  }

  goBack(session) {
    const { language, history } = session;
    
    if (history.length > 0) {
      const previousLevel = history.pop();
      session.level = previousLevel;
      return {
        response: translations[language][previousLevel],
        endSession: false
      };
    } else {
      session.level = 'welcome';
      return {
        response: translations[language].welcome,
        endSession: false
      };
    }
  }

  // Clean up expired sessions
  cleanupSessions() {
    const now = Date.now();
    Object.keys(this.sessions).forEach(sessionId => {
      if (now - this.sessions[sessionId].lastActivity > 30 * 60 * 1000) { // 30 minutes
        delete this.sessions[sessionId];
      }
    });
  }
}

module.exports = new MenuHandler();

