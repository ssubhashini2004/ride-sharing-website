import React, { useEffect, useState } from 'react';
import logo from './logo.png';  // Adjust the path as needed based on your directory structure

function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);  // Display for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return visible ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <img src={logo} alt="Logo" />
  </div> : null;
}

export default SplashScreen;
