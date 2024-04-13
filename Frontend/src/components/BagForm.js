import React, { useState } from 'react';
import { addBags } from '../api/api';
import './BagForm.css'; 

function BagForm({ onAddBags }) {
  const [bagIds, setBagIds] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);    

    const idsArray = bagIds.split('\n').filter(id => id.trim() !== ''); 

    console.log("Bag IDs:", idsArray);
    try {
      const response = await addBags(idsArray);
      console.log(response.data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAddBags();  
      setBagIds(''); 
    } catch (error) {
      console.error('Error adding bags:', error.response ? error.response.data : error);
    }

    setIsLoading(false);
  };

  return (
    <div className="bag-form-container"> 
    <h2>Baggage Input</h2>
    <form onSubmit={handleSubmit}>
      <textarea
        className="bag-ids-textarea" 
        placeholder="Enter one bag ID"
        value={bagIds}
        onChange={(e) => setBagIds(e.target.value)}
        required
      ></textarea>
      <button className="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Bags'}
      </button>
    </form>
  </div>
  
  );
}

export default BagForm;
