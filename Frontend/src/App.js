import React, { useState } from 'react';
import BagForm from './components/BagForm';
import BagStatistics from './components/BagStatistics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  const [isUpdated, setIsUpdated] = useState(false);  

  const handleAddBags = () => {
    setIsUpdated(true); 
  };

  return (
    <div className="App">
      <Navbar/>
      <BagForm onAddBags={handleAddBags} />
      <BagStatistics isUpdated={isUpdated} />
      <Footer/>
    </div>
  );
}

export default App;
