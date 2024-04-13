import React, { useState, useEffect } from 'react';
import { getBagStatistics } from '../api/api';
import './BagStatistics.css'; 

function BagStatistics({ isUpdated }) {
  const [statistics, setStatistics] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAllFlights, setShowAllFlights] = useState(false);

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      const response = await getBagStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStatistics();
  }, [isUpdated]);  

  const toggleFlights = () => {
    setShowAllFlights(!showAllFlights);
  };

  return (
    <div className="bag-statistics-container flight-info">
     
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>No of bags: {statistics.totalBags}</p>
            {showAllFlights ? (
              <>
                <p>Flights: 
                  {statistics.flights ? 
                    statistics.flights.map((flight, index) => (
                      <span key={index} className="flight-name">{flight}{index !== statistics.flights.length - 1 ? ' ' : ''}</span>
                    )) 
                    : 'N/A'}
                </p>
                <button className="show-hide-button" onClick={toggleFlights}>Show Less Flights</button>
              </>
            ) : (
              <>
                <p>Flights: 
                  {statistics.flights ? 
                    statistics.flights.slice(0, 5).map((flight, index) => (
                      <span key={index} className="flight-name">{flight}{index !== 4 ? ' ' : ''}</span>
                    )) 
                    : 'N/A'}
                </p>
                <button className="show-hide-button" onClick={toggleFlights}>Show More Flights</button>
              </>
            )}

<div className="airline-distribution-table">
  <h3>Airline Distribution</h3>
  <table>
    <thead>
      <tr>
        <th>Airline</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(statistics.airlineDistribution || {}).map((airline, index) => (
        <tr key={index}>
          <td>{airline}</td>
          <td>{statistics.airlineDistribution[airline]}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<div className="flight-distribution-table">
  <h3>Flight Distribution</h3>
  <table>
    <thead>
      <tr>
        <th>Flight</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(statistics.flightDistribution || {}).map((flight, index) => (
        <tr key={index}>
          <td>{flight}</td>
          <td>{statistics.flightDistribution[flight]}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

           
          </>
        )}
      </div>
    </div>
  );
}

export default BagStatistics;
