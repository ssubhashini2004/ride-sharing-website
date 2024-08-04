import React, { useState, useEffect } from "react";

function BookingConfirmation({ onConfirm }) {
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");

  useEffect(() => {
    // Generate random driver name and mobile number
    const randomDriverName = generateRandomName();
    const randomDriverMobile = generateRandomMobile();

    // Set the generated values
    setDriverName(randomDriverName);
    setDriverMobile(randomDriverMobile);

    // Simulate sending OTP
    setTimeout(() => {
      // Call the onConfirm function to notify the parent component that booking is confirmed
      onConfirm();
    }, 2000);
  }, []);

  const generateRandomName = () => {
    // Random driver names list
    const driverNames = [
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Emily Brown",
    ];
    // Generate random index
    const randomIndex = Math.floor(Math.random() * driverNames.length);
    // Return the random name
    return driverNames[randomIndex];
  };

  const generateRandomMobile = () => {
    // Generate random mobile number between 1000000000 and 9999999999
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  return (
    <div className="booking-confirmation" style={styles.confirmationContainer}>
      <h2 style={styles.heading}>Booking Confirmed!</h2>
      <p style={styles.text}>OTP sent to your registered mobile number!</p>
      <p style={styles.text}>Your driver is {driverName}</p>
      <p style={styles.text}>Call your driver at {driverMobile}</p>
    </div>
  );
}

function SearchPage({ destination, onBookingConfirmed }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchCars();
  }, []);

  const searchCars = () => {
    const dummyCars = [
      { id: 1, name: "Scooter", type: "Vespa", price: "Rs.100" },
      { id: 2, name: "Car", type: "Mini", price: "Rs.250" },
      { id: 3, name: "Car", type: "SUV", price: "Rs.450" },
    ];
    setCars(dummyCars);
  };

  const handleConfirmBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onBookingConfirmed();
    }, 4000);
  };

  return (
    <div className="search-page" style={styles.searchPage}>
      <h2 style={styles.heading}>Available Cars for {destination}</h2>
      <div className="cars-list" style={styles.carsList}>
        {cars.map((car) => (
          <div key={car.id} className="car" style={styles.car}>
            <h3 style={styles.carHeading}>{car.name}</h3>
            <p style={styles.carDetail}>Type: {car.type}</p>
            <p style={styles.carDetail}>Price: {car.price}</p>
            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              style={styles.button}
            >
              Select Car
            </button>
          </div>
        ))}
      </div>
      {loading && <p style={styles.loading}>Loading...</p>}
    </div>
  );
}

function AL() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [destination, setDestination] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSelectDestination = (selectedDestination) => {
    setDestination(selectedDestination);
  };

  const handleBookingConfirmed = () => {
    setBookingConfirmed(true);
  };

  return (
    <div>
      {loggedIn && !destination && (
        <DestinationPage onSelectDestination={handleSelectDestination} />
      )}
      {loggedIn && destination && !bookingConfirmed && (
        <SearchPage
          destination={destination}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}
      {bookingConfirmed && (
        <BookingConfirmation onConfirm={() => setBookingConfirmed(true)} />
      )}
    </div>
  );
}

function LocationSelection({ onSelectLocation }) {
  const [location, setLocation] = useState("");

  const handleSelectLocation = () => {
    onSelectLocation(location);
  };

  return (
    <div className="location-selection" style={styles.locationSelection}>
      <h2 style={styles.heading}>Select Pickup Location</h2>
      <input
        type="text"
        placeholder="Enter pickup location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSelectLocation} style={styles.button}>
        Select Pickup Location
      </button>
      <p style={styles.text}>Or</p>
      <button
        onClick={() =>
          navigator.geolocation.getCurrentPosition((position) =>
            onSelectLocation(
              `${position.coords.latitude}, ${position.coords.longitude}`
            )
          )
        }
        style={styles.button}
      >
        Use My Current Location
      </button>
    </div>
  );
}

function DestinationPage({ onSelectDestination }) {
  const [manualDestination, setManualDestination] = useState("");

  const handleSelectManualDestination = () => {
    if (manualDestination.trim() !== "") {
      onSelectDestination(manualDestination.trim());
    }
  };

  return (
    <div className="destination-page" style={styles.destinationPage}>
      <h2 style={styles.heading}>Select Destination</h2>
      <input
        type="text"
        placeholder="Enter destination"
        value={manualDestination}
        onChange={(e) => setManualDestination(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSelectManualDestination} style={styles.button}>
        Select Destination
      </button>
      <LocationSelection onSelectLocation={onSelectDestination} />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497513.50684670504!2d79.6179621829818!3d13.04685498122354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1713119314707!5m2!1sen!2sin"
        width="400"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

const styles = {
  confirmationContainer: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  heading: {
    color: "#333",
  },
  text: {
    color: "#666",
    marginBottom: "10px",
  },
  searchPage: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  carsList: {
    marginTop: "20px",
  },
  car: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  carHeading: {
    color: "#333",
    marginBottom: "5px",
  },
  carDetail: {
    color: "#666",
    marginBottom: "5px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loading: {
    color: "#777",
    marginTop: "20px",
  },
  locationSelection: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  destinationPage: {
    textAlign: "center",
  },
};

export default AL;
