import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

const useTokenExpiration = (token) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsExpired(true);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      console.log(decodedToken.exp);
      if (decodedToken.exp < currentTime) {
        setIsExpired(true);
      } else {
        setIsExpired(false);
      }
    } catch (error) {
      console.error('Failed to decode token', error);
      setIsExpired(true);
    }
  }, [token]);

  return isExpired;
};

export default useTokenExpiration;
