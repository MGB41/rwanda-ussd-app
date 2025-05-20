const translations = require('./translations');

class MenuHandler {
  constructor() {
    this.sessions = {};
  }

  handleMenu(sessionId, userInput, phoneNumber) {
    // Initialize session if it doesn't exist
    if (!this.sessions[sessionId]) {
      this.sessions[sessionId] = {
        language: 'en',
        level: 'welcome',
        history: [],
        lastActivity: Date.now()
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
        return this.handleBusTicketsMenu(session, userInput);
      case 'eventTickets':
        return this.handleEventTicketsMenu(session, userInput);
      case 'flightTickets':
        return this.handleFlightTicketsMenu(session, userInput);
      case 'browseCars':
        return this.handleBrowseCarsMenu(session, userInput);
      case 'sellYourCar':
        return this.handleSellYourCarMenu(session, userInput);
      case 'kigaliButare':
      case 'kigaliGisenyi':
      case 'concerts':
      case 'sportsEvents':
      case 'domesticFlights':
      case 'internationalFlights':
      case 'sedanCars':
      case 'suvCars':
      case 'submitCarDetails':
      case 'pricingGuide':
        return this.handleSubMenu(session, userInput);
      default:
        return {
          response: translations[language].welcome,
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
