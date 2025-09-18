import { useState, useEffect } from "react";

function Car() {
  // Load initial data from localStorage or use empty array
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem('carInventory');
    return savedCars ? JSON.parse(savedCars) : [];
  });
  
  const [carYear, setYear] = useState(new Date().getFullYear());
  const [carMake, setMake] = useState("");
  const [carModel, setModel] = useState("");

  // Save to localStorage whenever cars change
  useEffect(() => {
    localStorage.setItem('carInventory', JSON.stringify(cars));
  }, [cars]);

  function handleAddCar() {
    if (!carMake.trim() || !carModel.trim()) {
      alert("Please enter both make and model");
      return;
    }
    
    const newCar = {
      year: carYear,
      make: carMake.trim(),
      model: carModel.trim(),
    };
    
    setCars(prevCars => [...prevCars, newCar]);
    setMake("");
    setModel("");
  }

  function handleRemoveCar(index) {
    setCars(prevCars => prevCars.filter((_, i) => i !== index));
  }

  function handleYearChange(event) {
    const year = parseInt(event.target.value);
    if (year >= 1900 && year <= new Date().getFullYear() + 1) {
      setYear(year);
    }
  }

  function handleMakeChange(event) {
    setMake(event.target.value);
  }

  function handleModelChange(event) {
    setModel(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleAddCar();
    }
  }

  function clearAllCars() {
    if (window.confirm("Are you sure you want to clear all cars?")) {
      setCars([]);
    }
  }

  // Calculate statistics
  const totalCars = cars.length;
  const oldestYear = totalCars > 0 ? Math.min(...cars.map(car => car.year)) : '-';
  const newestYear = totalCars > 0 ? Math.max(...cars.map(car => car.year)) : '-';

  return (
    <div className="car-inventory-container">
      <div className="header">
        <h1>Car Inventory Manager</h1>
        <p>Manage your car collection with ease</p>
        {totalCars > 0 && (
          <button className="clear-btn" onClick={clearAllCars}>
            Clear All Cars
          </button>
        )}
      </div>
      
      <div className="content">
        <div className="form-section">
          <h2 className="form-title">Add New Car</h2>
          
          <div className="input-group">
            <label htmlFor="car-year">Year</label>
            <input
              id="car-year"
              type="number"
              value={carYear}
              onChange={handleYearChange}
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="car-make">Make</label>
            <input
              id="car-make"
              type="text"
              value={carMake}
              onChange={handleMakeChange}
              placeholder="Enter car make (e.g., Toyota)"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="car-model">Model</label>
            <input
              id="car-model"
              type="text"
              value={carModel}
              onChange={handleModelChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter car model (e.g., Camry)"
            />
          </div>
          
          <button className="btn" onClick={handleAddCar}>Add Car to Inventory</button>
        </div>
        
        <div className="cars-section">
          <h2 className="section-title">Your Car Inventory</h2>
          
          <div className="stats">
            <div>
              <span>{totalCars}</span>
              <p>Total Cars</p>
            </div>
            <div>
              <span>{oldestYear}</span>
              <p>Oldest Car</p>
            </div>
            <div>
              <span>{newestYear}</span>
              <p>Newest Car</p>
            </div>
          </div>
          
          <div className="cars-list">
            {cars.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-car"></i>
                <p>No cars in inventory. Add your first car!</p>
              </div>
            ) : (
              cars.map((car, index) => (
                <div key={index} className="car-item">
                  <div className="car-info">
                    <div className="car-year">{car.year}</div>
                    <div className="car-make">{car.make}</div>
                    <div className="car-model">{car.model}</div>
                  </div>
                  <div className="car-actions">
                    <button 
                      className="delete-btn" 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete the ${car.year} ${car.make} ${car.model}?`)) {
                          handleRemoveCar(index);
                        }
                      }}
                      title="Delete"
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Car;