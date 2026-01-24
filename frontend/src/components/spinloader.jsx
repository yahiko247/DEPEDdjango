import React, { useEffect, useState } from 'react';
import spinner from '../assets/spinloader.svg';
import Layout from '../pages/Layout';
import Home from '../pages/home';

export default function Loading() {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false); // hide spinner after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      {showSpinner ? (
        <img src={spinner} alt="loading" />
      ) : (
       <Layout/>
      )}
    </div>
  );
}
