const express = require('express');
const router = express.Router();
const Baggage = require('../models/Baggage');


router.post('/add', async (req, res) => {
    try {
      const { bagIds } = req.body;
      const ids = bagIds.split('\n');
      
      for (let id of ids) {
        const letterCode = id.charAt(0);
        const airlineCode = id.charAt(1);
        const flightNumber = id.substring(2, 4);
        
        let airline;
        switch (airlineCode) {
          case 'I':
            airline = 'Indigo';
            break;
          case 'V':
            airline = 'Vistara';
            break;
          case 'E':
            airline = 'Emirates';
            break;
          default:
            airline = 'Unknown';
        }
        
        const flight = `${airline} ${flightNumber}`;
        
        const baggage = new Baggage({
          id,
          airline,
          flight
        });
        
        await baggage.save();
      }
      
      res.json({ message: 'Baggage data added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding baggage data', error: error.message });
    }
  });

  


router.get('/stats', async (req, res) => {
  try {
    const allBaggage = await Baggage.find();
    
    let totalBags = 0;
    const airlineDistribution = {};
    const flightDistribution = {};
    
    allBaggage.forEach(bag => {
      totalBags++;
    
      if (!airlineDistribution[bag.airline]) {
        airlineDistribution[bag.airline] = 1;
      } else {
        airlineDistribution[bag.airline]++;
      }
      
      
      const flightKey = `${bag.airline} ${bag.flight.split(' ')[1]}`;
      if (!flightDistribution[flightKey]) {
        flightDistribution[flightKey] = 1;
      } else {
        flightDistribution[flightKey]++;
      }
    });
    
  
    const formattedFlightDistribution = {};
    Object.keys(flightDistribution).forEach(key => {
      const airline = key.split(' ')[0];
      const flightNumber = key.split(' ')[1];
      const formattedKey = `${airline} ${flightNumber.charAt(1)}`;
      
      if (!formattedFlightDistribution[formattedKey]) {
        formattedFlightDistribution[formattedKey] = flightDistribution[key];
      } else {
        formattedFlightDistribution[formattedKey] += flightDistribution[key];
      }
    });
    
    res.json({
      totalBags,
      flights: Object.keys(formattedFlightDistribution),
      airlineDistribution,
      flightDistribution: formattedFlightDistribution
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router;
